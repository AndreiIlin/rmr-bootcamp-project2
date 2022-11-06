import { Box, Card, Grid, styled, Typography } from '@mui/material';
import { TypographyContainer } from '@ui-library/components/TypographyContainer';
import React from 'react';
import { FC, PropsWithChildren } from 'react';

export const AboutUsPage: FC<PropsWithChildren> = () => {
  const ImgWrapper = styled('div')(() => ({
    width: '100%',
    height: '400px',
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
            “Динозаврики в IT” - онлайн-платформа для навигации и выбора образовательных
            курсов, не оказывает образовательные услуги. Мы ждем прогрессивных и
            любознательных, готовых осваивать и покорять, дополнить свои знания
            современными компетенциями и получить профессию в IT сфере, подходящую именно
            для вас. Грамотные, терпеливые и внимательные кураторы помогут с выбором
            направления - аналитик, разработчик, дизайнер, тестировщик, администратор.
            Составим индивидуальную образовательную траекторию с учетом перспективы
            трудоустройства. Наши партнеры - 50 лучших университетов. Программа составлена
            таким образом, чтобы у каждого слушателя было достаточно времени для освоения
            материала и закрепления тем. Небольшие группы до 10 человек, множество
            практических занятий и повторение пройденного материала в начале и в конце
            каждого блока способствуют лучшему усвоению знаний. Индивидуальный план
            развития строится из базовой обязательной части и дополнительных по
            направлениям. Перспектива трудоустройства есть на любом этапе обучения. Наши
            партнеры - ведущие госкорпорации и крупные IT компании.
            <br />
            <br />
            Мы ждем людей пенсионного возраста, проживающих в РФ, имеющих среднее
            специальное или высшее образование в любой области. Регистрация на Госуслугах
            обязательна. Получение образования в IT сфере с использованием платформы
            “Динозаврики в IT” оплачивается государством. Помощь в оформлении заявки,
            подготовке пакета документов для зачисления на курс возможна после
            регистрации.
            <br />
            <br />
          </TypographyContainer>
          <Typography component={'h2'} variant="h5">
            Контакты
          </Typography>
          <TypographyContainer>
            +7 (495) 999 9999
            <br />
            +7 (495) 888 8888
            <br />
            с мобильного 8 800 800 8080 (звонок бесплатный)
            <br />
            общие вопросы - info.it@mail.ru
            <br />
            помощь в оформлении документов - help.it@mail.ru
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
                src={'https://www.kino-teatr.ru/movie/posters/big/7/116827.jpg'}
              />
            </ImgWrapper>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};
