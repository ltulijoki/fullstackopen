import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <i>{part.description}</i>
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );
  }
};

export default Part