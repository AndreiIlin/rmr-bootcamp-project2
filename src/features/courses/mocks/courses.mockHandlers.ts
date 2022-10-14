import { rest } from 'msw';
import {
  CourseDetailsResponse,
  CourseProviderCreateArgs,
  CourseProviderCreateResponse,
  CourseProviderResponse,
  CourseProvidersListResponse,
  CourseProviderUpdateArgs,
  CoursesListArgs,
  CoursesListResponse,
} from '../courses.service';
import {
  courseProviderFullFixture as fullCourseProviderFixture,
  fullCourseFixture,
  generateShortCourseProviders,
  generateShortCourses,
  shortCourseFixtures,
} from './courses.fixtures';

const ITEMS_PER_PAGE = 12;

type FakeErrorJSON = {
  message: string;
};

const generated = generateShortCourses(200);
const generatedShortCourseProviders = generateShortCourseProviders(100);

export const coursesMockHandlers = [
  // @NOTE: По какой-то причине MSW не принимает опциональные параметры.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rest.get<null, CoursesListArgs, CoursesListResponse | FakeErrorJSON>(
    `/api/courses`,
    (req, res, ctx) => {
      const searchParams = req.url.searchParams;
      const page = searchParams.get('page') || '1';
      const search = searchParams.get('search');
      const sortBy = searchParams.get('sortBy');

      let courses = shortCourseFixtures.slice();
      courses.push(...generated);

      if (search) {
        courses = courses.filter((course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
      }

      if (sortBy) {
        courses = courses.sort((a, b) => {
          if (sortBy === 'date-start') {
            return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
          }
          if (sortBy === 'date-end') {
            return new Date(a.dateEnd).getTime() - new Date(b.dateEnd).getTime();
          }
          return 0;
        });
      }

      const TOTAL = courses.length;

      courses = courses.slice(
        (Number(page) - 1) * ITEMS_PER_PAGE,
        Number(page) * ITEMS_PER_PAGE,
      );

      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          pagination: {
            page: 1,
            total: TOTAL,
          },
          courses,
        }),
      );
    },
  ),
  rest.get<null, any, CourseDetailsResponse | FakeErrorJSON>(
    `/api/courses/:id`,
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          course: fullCourseFixture,
        }),
      );
    },
  ),
  rest.get<null, any, CourseProvidersListResponse | FakeErrorJSON>(
    `/api/course-providers`,
    (req, res, ctx) => {
      const page = req.url.searchParams.get('page') || '1';
      const sliced = generatedShortCourseProviders.slice(
        (Number(page) - 1) * ITEMS_PER_PAGE,
        Number(page) * ITEMS_PER_PAGE,
      );
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          providers: sliced,
          pagination: {
            page: parseInt(page),
            totalPages: Math.floor(generatedShortCourseProviders.length / ITEMS_PER_PAGE),
          },
        }),
      );
    },
  ),
  rest.get<null, any, CourseProviderResponse | FakeErrorJSON>(
    `/api/course-providers/:id`,
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          provider: fullCourseProviderFixture,
        }),
      );
    },
  ),
  rest.post<
    CourseProviderUpdateArgs,
    { id: string },
    CourseProviderResponse | FakeErrorJSON
  >(`/api/course-providers/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { name, description } = req.body;
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Курс успешно обновлен',
      }),
    );
  }),

  rest.post<
    CourseProviderCreateArgs,
    { id: string },
    CourseProviderCreateResponse | FakeErrorJSON
  >(`/api/course-providers/new`, (req, res, ctx) => {
    const { id } = req.params;
    const { name, description } = req.body;
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Курс успешно обновлен',
      }),
    );
  }),

  rest.delete<
    CourseProviderUpdateArgs,
    { id: string },
    CourseProviderResponse | FakeErrorJSON
  >(`/api/course-providers/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { name, description } = req.body;
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Курс успешно удален',
      }),
    );
  }),
];