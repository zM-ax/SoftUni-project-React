import React from "react";
import { AppButton } from "../../styles/AppButton";
import {
  DangerZoneCard,
  DangerHeader,
  DangerText,
  DangerActions,
} from "./DangerZoneSection.styles";

interface DangerZoneSectionProps {
  onDelete: () => void;
}

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({ onDelete }) => (
  <DangerZoneCard>
    <DangerHeader>Опасна зона</DangerHeader>
    <DangerText>
      Изтриването на профила може да доведе до загуба на историята на поръчките и запаметените данни за доставка. Продължавай само ако си напълно сигурна.
    </DangerText>
    <DangerActions>
      <AppButton type="button" onClick={onDelete} $variant="danger">
        Изтрий профила
      </AppButton>
    </DangerActions>
  </DangerZoneCard>
);

export default DangerZoneSection;
