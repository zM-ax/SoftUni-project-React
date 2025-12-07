import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import {
  DateSection,
  DateLabel,
  DateHelper,
  DateFieldButton,
  DatePlaceholder,
  DateFieldValue,
  DateError,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
} from "./DeliveryDatePicker.styles";

export interface DeliveryDatePickerProps {
  selectedDate: string; // ISO: YYYY-MM-DD
  onSelectedDateChange: (value: string) => void;
  error?: string | null;
  onErrorChange?: (value: string | null) => void;
  minDaysAhead?: number;
  maxDaysAhead?: number;
}

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const toISO = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const fromISO = (iso: string | null | undefined): Date | undefined => {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
};

const WEEKDAYS = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const MONTHS = [
  "януари",
  "февруари",
  "март",
  "април",
  "май",
  "юни",
  "юли",
  "август",
  "септември",
  "октомври",
  "ноември",
  "декември",
];

const formatDisplayDate = (iso: string) => {
  const date = fromISO(iso);
  if (!date) return iso;

  const day = date.getDate();
  const weekday = WEEKDAYS[date.getDay()];
  const monthName = MONTHS[date.getMonth()];

  return `${weekday}, ${day} ${monthName}`;
};

export const DeliveryDatePicker = ({
  selectedDate,
  onSelectedDateChange,
  error,
  onErrorChange,
  minDaysAhead = 2,
  maxDaysAhead = 30,
}: DeliveryDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const min = addDays(today, minDaysAhead);
    const max = addDays(today, maxDaysAhead);
    return { minDate: min, maxDate: max };
  }, [minDaysAhead, maxDaysAhead]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const selectedDateObj = fromISO(selectedDate || undefined);

  const handleDaySelect = (day?: Date) => {
  if (!day) return;

  if (day < minDate || day > maxDate) {
    const minStr = toISO(minDate).replace(/-/g, ".");
    const maxStr = toISO(maxDate).replace(/-/g, ".");
    onErrorChange?.(`Моля, избери дата между ${minStr} и ${maxStr}.`);
    return;
  }

  const iso = toISO(day);
  onSelectedDateChange(iso);
  onErrorChange?.(null);
  setIsOpen(false);
};

  return (
    <DateSection>
      <DateLabel>Избери дата за взимане/доставка</DateLabel>

      <DateHelper>
        Поръчките се приемат минимум {minDaysAhead} дни предварително.
        В календара виждаш само валидните дати.
      </DateHelper>

      <DateFieldButton type="button" onClick={handleOpen}>
        {selectedDate ? (
          <DateFieldValue>{formatDisplayDate(selectedDate)}</DateFieldValue>
        ) : (
          <DatePlaceholder>Избери дата…</DatePlaceholder>
        )}
        <span aria-hidden="true">▾</span>
      </DateFieldButton>

      {error && <DateError>{error}</DateError>}

      {isOpen && (
        <ModalBackdrop onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Избери дата</ModalTitle>
              <ModalCloseButton type="button" onClick={handleClose}>
                ×
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <DayPicker
                mode="single"
                selected={selectedDateObj}
                onSelect={handleDaySelect}
                fromDate={minDate}
                toDate={maxDate}
                locale={undefined} // може да сложиш bg-BG с date-fns, ако решиш
              />
            </ModalBody>
          </ModalContent>
        </ModalBackdrop>
      )}
    </DateSection>
  );
};
