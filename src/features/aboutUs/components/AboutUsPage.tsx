import { Box, Grid, styled, Typography } from '@mui/material';
import { TypographyContainer } from '@ui-library/components/TypographyContainer';
import React from 'react';
import { FC, PropsWithChildren } from 'react';

export const AboutUsPage: FC<PropsWithChildren> = () => {
  const ImgWrapper = styled('div')(() => ({
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    position: 'relative',
  }));

  const CourseProviderCoverImg = styled('img')(() => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
  }));

  return (
    <section>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} paddingRight={{ lg: '100px' }}>
          <Typography component={'h1'} variant="h3">
            О нас
          </Typography>
          <TypographyContainer>
            “Динозаврики в IT” - онлайн-платформа для навигации в IT профессиях и помощи в
            выборе образовательных курсов для освоения выбранной профессии. На нашей
            платформе можно получить индивидуальную образовательную программу по итогам
            прохождения тестирования с учетом перспективы трудоустройства. Индивидуальный
            план развития строится из базовой обязательной части и дополнительных по
            направлениям. Перспектива трудоустройства есть на любом этапе обучения. Наши
            партнеры - государственные компании и крупные IT компании. Мы ждем людей,
            обладающих статусом “пенсионер”, проживающих в РФ, имеющих среднее специальное
            или высшее образование в любой области. Регистрация на Госуслугах обязательна.
            Получение образования в IT сфере с использованием платформы “Динозаврики в IT”
            оплачивается государством. Помощь в оформлении заявки, подготовке пакета
            документов для зачисления на курс возможна после регистрации.
            <br />
            <br />
          </TypographyContainer>
          <Typography component={'h2'} variant="h5">
            Если хотите стать слушателем курсов, то обращайтесь:
          </Typography>
          <TypographyContainer>
            со стационарного телефона: 8 495 999 9999
            <br />
            с мобильного телефона: 8 800 800 8080 (звонок бесплатный)
            <br />
            общие вопросы - info.it@mail.ru
            <br />
            помощь в оформлении документов - help.it@mail.ru
            <br />
            <br />
          </TypographyContainer>
          <Typography component={'h2'} variant="h5">
            Если хотите стать провайдером курсов или нашим партнером, то обращайтесь:
          </Typography>
          <TypographyContainer>
            со стационарного телефона: 8 495 888 8888
            <br />
            с мобильного телефона: 8 800 900 9090 (звонок бесплатный)
            <br />
            консультации - business@mail.ru
            <br />
            <br />
          </TypographyContainer>
          <Typography variant="overline" style={{ lineHeight: '1rem' }}>
            При поддержке Федерального гранта Национальной программы “Цифровая экономика
            РФ” “В IT до 105” №12345 от 10.10.2023
          </Typography>
          s
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ pt: 1 }}>
            <ImgWrapper>
              <CourseProviderCoverImg
                src={
                  'https://learningcenter.nethouse.ru/static/img/0000/0007/0782/70782844.q1ofa7fuq6.W665.jpg'
                }
              />
            </ImgWrapper>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};
