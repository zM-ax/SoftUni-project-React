import { useState } from "react";
import styled from "styled-components";
import { FAQ_ITEMS } from "../../constants/faq";

const PageWrapperStyled = styled.div`
  min-height: calc(100vh - 72px);
  padding: 3rem 1.5rem 4rem;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 2.5rem 1.25rem 3rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 2rem 1rem 2.5rem;
  }
`;

const ContentStyled = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  padding: 2.5rem 2.25rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.8rem 1.5rem;
  }
`;

const TitleStyled = styled.h1`
  font-size: 1.9rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.titles};
`;

const IntroStyled = styled.p`
  font-size: 0.98rem;
  color: #6a5a4a;
  margin-bottom: 1.8rem;
  font-family: ${({ theme }) => theme.fonts.descriptions};
`;

const AccordionStyled = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const ItemStyled = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const QuestionRowStyled = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: transparent;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  align-items: center;

  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const QuestionTextStyled = styled.h3`
  margin: 0;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const IconStyled = styled.span<{ $isOpen: boolean }>`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "none")};
  transition: transform 0.15s ease;
`;

const AnswerStyled = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "600px" : "0px")};
  overflow: hidden;
  transition: max-height 0.22s ease;
`;

const AnswerInnerStyled = styled.div`
  padding-bottom: 1rem;
  padding-right: 1.5rem;
  font-size: 0.95rem;
  color: #4f4338;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fonts.descriptions};

  p {
    margin: 0 0 0.4rem;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FAQPage = () => {
  const [openId, setOpenId] = useState<number | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <PageWrapperStyled>
      <ContentStyled>
        <TitleStyled>Често задавани въпроси</TitleStyled>
        <IntroStyled>
          Събрах най-честите въпроси за поръчките, доставката и десертите на
          „Две шепи брашно“. Ако не откриеш отговор тук, винаги можеш да ми
          пишеш през формата за контакт или в Instagram.
        </IntroStyled>

        <AccordionStyled>
          {FAQ_ITEMS.map((item) => {
            const isOpen = item.id === openId;

            return (
              <ItemStyled key={item.id}>
                <QuestionRowStyled
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  $isOpen={isOpen}
                >
                  <QuestionTextStyled>
                    {item.id}. {item.question}
                  </QuestionTextStyled>
                  <IconStyled $isOpen={isOpen}>›</IconStyled>
                </QuestionRowStyled>

                <AnswerStyled $isOpen={isOpen}>
                  <AnswerInnerStyled
                    dangerouslySetInnerHTML={{ __html: item.answer }} //This is safe because we use our own html from faq constants
                  />
                </AnswerStyled>
              </ItemStyled>
            );
          })}
        </AccordionStyled>
      </ContentStyled>
    </PageWrapperStyled>
  );
};

export default FAQPage;
