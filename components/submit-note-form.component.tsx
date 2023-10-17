import React, {
  forwardRef,
  useCallback,
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

interface Props {
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
    {noteContentPlaceholder, noteSubmitLabel}: Props,
    ref: React.Ref<SubmitNoteFormMethods>,
  ) => {
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
            placeholderTextColor={'#C38A65'}
          />
          <Button label={noteSubmitLabel} />
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
