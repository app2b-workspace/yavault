import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {StyleSheet, View} from 'react-native';
import {Button} from './button.component';
import {useSubmitNoteViewModel} from './submit-note.viewmodel';
import {DependenciesContext} from '../context/dependencies.context';

interface Props {
  folderId: string;
  noteContentPlaceholder: string;
  noteSubmitLabel: string;
}

export interface SubmitNoteFormMethods {
  expand: () => void;
}

const EXPANDED_INDEX = 1;
const CLOSED_INDEX = -1;

export const SubmitNoteForm = forwardRef(
  (
    {folderId, noteContentPlaceholder, noteSubmitLabel}: Props,
    ref: React.Ref<SubmitNoteFormMethods>,
  ) => {
    const dependencies = useContext(DependenciesContext);
    const viewModel = useSubmitNoteViewModel(folderId, dependencies);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '80%'], []);
    const [index, setIndex] = useState<number>(CLOSED_INDEX);

    const backdropComponent = useCallback((props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={EXPANDED_INDEX}
          disappearsOnIndex={CLOSED_INDEX}
          pressBehavior={'close'}
          opacity={0.8}
        />
      );
    }, []);

    useImperativeHandle(ref, () => {
      return {
        expand() {
          bottomSheetRef.current?.expand();
        },
      };
    });
    const submit = useCallback(() => {
      viewModel.submit()?.then(() => bottomSheetRef.current?.close());
      bottomSheetRef.current?.close();
    }, [viewModel]);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={backdropComponent}
        backgroundStyle={styles.bottomSheetContent}
        keyboardBehavior="extend"
        index={index}
        enablePanDownToClose={true}
        onChange={(i: number) => {
          setIndex(i);
        }}
        snapPoints={snapPoints}>
        <View style={styles.bottomSheetInputContent}>
          <BottomSheetTextInput
            style={styles.input}
            placeholder={noteContentPlaceholder}
            maxLength={40}
            value={viewModel.content}
            placeholderTextColor={'#C38A65'}
            onChangeText={(content: string) => viewModel.newContent(content)}
          />
          <Button
            disabled={!viewModel.canSubmit}
            label={noteSubmitLabel}
            onPress={submit}
          />
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#b56d3f',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopColor: '#b56d3f',
  },
  bottomSheetInputContent: {
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
});
