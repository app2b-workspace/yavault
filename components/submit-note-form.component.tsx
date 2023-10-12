import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {StyleSheet, View} from 'react-native';
import {Button} from './button.component';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {hexToRGBA} from '../lib/common/hexa.utils';

import Animated from 'react-native-reanimated';

interface Props {
  noteContentPlaceholder: string;
  noteSubmitLabel: string;
  visible?: boolean | undefined;
  onClose: () => void;
}

const CustomBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: hexToRGBA('#b56d3f', 0.8),
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};
export const SubmitNoteForm = ({
  visible = false,
  onClose,
  noteContentPlaceholder,
  noteSubmitLabel,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => {
      return visible ? <CustomBackdrop {...props} /> : null;
    },
    [visible],
  );
  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, [visible]);
  console.log('visible', visible);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={backdropComponent}
      backgroundStyle={styles.bottomSheetContent}
      keyboardBehavior="extend"
      enablePanDownToClose={true}
      onClose={onClose}
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
};

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
