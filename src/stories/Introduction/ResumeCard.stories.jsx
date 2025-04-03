import ResumeCard from '../../components/Introduction/ResumeCard';

export default {
  title: 'Introduction/ResumeCard',
  component: ResumeCard,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    onImageClick: () => console.log('Resume image clicked'),
  },
}; 