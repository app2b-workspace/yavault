import {useDispatch} from 'react-redux';
import {submitNote} from '../lib/notes/usecases/submit-a-note.usecase';
import {AppDispatch, Dependencies} from '../lib/store/create.store';
import {useCallback, useEffect, useState} from 'react';
import {isNotEmptyStringGuard} from '../lib/common/is-string-defined.guard';

const EMPTY_STRING = '';
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
    setCanSubmit(false);
    return dispatch(
      submitNote({content, noteId: idGenerator.generate(), folderId}),
    ).finally(() => {
      changeContent(EMPTY_STRING);
    });
  }, [canSubmit, content, dispatch, folderId, idGenerator]);

  useEffect(() => {
    setCanSubmit(isNotEmptyStringGuard(content));
  }, [content]);
  return {
    newContent(value: string) {
      changeContent(value);
    },
    submit,
    canSubmit,
    content,
  };
};
