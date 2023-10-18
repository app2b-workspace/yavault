import {useDispatch} from 'react-redux';
import {submitNote} from '../lib/notes/usecases/submit-a-note.usecase';
import {AppDispatch, Dependencies} from '../lib/store/create.store';
import {useCallback, useState} from 'react';
import {isDefinedOrNotNullGuard} from '../lib/common/is-defined-or-not-null.guard';

export type SubmitNoteFormDependencies = Pick<Dependencies, 'idGenerator'>;
export const useSubmitNoteViewModel = (
  folderId: string,
  {idGenerator}: SubmitNoteFormDependencies,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [content, changeContent] = useState<string>('');
  const submit = useCallback(() => {
    if (!canSubmit) {
      return;
    }
    return dispatch(
      submitNote({content, noteId: idGenerator.generate(), folderId}),
    );
  }, [canSubmit, content, dispatch, folderId, idGenerator]);
  return {
    newContent(value: string) {
      changeContent(value);
      setCanSubmit(isDefinedOrNotNullGuard(value) && value.trim().length > 0);
    },
    submit,
    canSubmit,
  };
};
