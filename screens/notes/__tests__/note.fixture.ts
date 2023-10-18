import {NoteViewModel} from '../refresh-folder.viewmodel';

export const createNoteViewModelFixture = () => {
  return {
    createNoteView: ({
      authorId,
      content,
      id,
      time,
    }: {
      id: string;
      authorId: string;
      content: string;
      time: string;
    }): Partial<NoteViewModel> => ({
      authorId,
      content,
      id,
      time,
    }),
  };
};

export type NoteViewModelFixture = ReturnType<
  typeof createNoteViewModelFixture
>;
