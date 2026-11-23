import { useParams, Outlet } from 'react-router-dom';
import { getCourse } from '../../data/courses';
import LockedCourseView from '../common/LockedCourseView';

export default function CourseRouteGuard() {
  const { courseId } = useParams<{ courseId?: string }>();
  const course = courseId ? getCourse(courseId) : undefined;

  if (course && course.status === 'locked') {
    return <LockedCourseView course={course} />;
  }

  return <Outlet />;
}
