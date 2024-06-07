import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map(part => <Part part={part} key={part.name} />)}
    </div>
  );
};

export default Content;