import background from "../backgrounds/Chess.jpg";
import ChessPlay from '../../components/Hobbies/ChessPlay';

export default {
  title: 'Hobbies/ChessPlay',
  component: ChessPlay,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'chess',
      values: [
        {
          name: 'chess',
          value: `url("${background}")`,
        },
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
};

export const Default = {
  args: {},
}; 