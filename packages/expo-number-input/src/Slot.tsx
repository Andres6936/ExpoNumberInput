import * as React from 'react';
import {Fragment} from 'react';
import {
    type ImageStyle as RNImageStyle,
    type PressableProps as RNPressableProps,
    type PressableStateCallbackType,
    type StyleProp,
    StyleSheet,
    Text as RNText,
    View as RNView,
} from 'react-native';

const View = function (props: React.ComponentPropsWithRef<typeof RNView> ) {
    const {children, ref, ...viewSlotProps} = props;

    if (!React.isValidElement(children)) {
        console.error('Slot.View - Invalid asChild element', children);
        return null;
    }

    return React.cloneElement<React.ComponentPropsWithRef<typeof RNView>>(
        isTextChildren(children) ? <Fragment/> : children, {
            ...mergeProps(viewSlotProps, children.props as AnyProps),
            ref: ref ? composeRefs(ref, (children as any).ref) : (children as any).ref,
        }
    )
}

View.displayName = 'Slot.View';

const Text = function (props: React.ComponentPropsWithRef<typeof RNText> ) {
    const {children, ref, ...textSlotProps} = props;

    if (!React.isValidElement(children)) {
        console.error('Slot.Text - Invalid asChild element', children);
        return null;
    }

    return React.cloneElement<React.ComponentPropsWithRef<typeof RNText>>(
        isTextChildren(children) ? <Fragment/> : children, {
            ...mergeProps(textSlotProps, children.props as AnyProps),
            ref: ref ? composeRefs(ref, (children as any).ref) : (children as any).ref,
        }
    )
}

Text.displayName = 'Slot.Text';

export {View, Text};

// This project uses code from WorkOS/Radix Primitives.
// The code is licensed under the MIT License.
// https://github.com/radix-ui/primitives/tree/main

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (node: T) =>
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref != null) {
                (ref as React.RefObject<T>).current = node;
            }
        });
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
    // all child props should override
    const overrideProps = { ...childProps };

    for (const propName in childProps) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];

        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args: unknown[]) => {
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            }
            // but if it exists only on the slot, we use only this one
            else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        }
        // if it's `style`, we merge them
        else if (propName === 'style') {
            overrideProps[propName] = combineStyles(slotPropValue, childPropValue);
        } else if (propName === 'className') {
            overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
        }
    }

    return { ...slotProps, ...overrideProps };
}

type PressableStyle = RNPressableProps['style'];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

function combineStyles(slotStyle?: Style, childValue?: Style) {
    if (typeof slotStyle === 'function' && typeof childValue === 'function') {
        return (state: PressableStateCallbackType) => {
            return StyleSheet.flatten([slotStyle(state), childValue(state)]);
        };
    }
    if (typeof slotStyle === 'function') {
        return (state: PressableStateCallbackType) => {
            return childValue ? StyleSheet.flatten([slotStyle(state), childValue]) : slotStyle(state);
        };
    }
    if (typeof childValue === 'function') {
        return (state: PressableStateCallbackType) => {
            return slotStyle ? StyleSheet.flatten([slotStyle, childValue(state)]) : childValue(state);
        };
    }

    return StyleSheet.flatten([slotStyle, childValue].filter(Boolean));
}

export function isTextChildren(
    children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode),
) {
    return Array.isArray(children)
        ? children.some(child => typeof child === 'string')
        : typeof children === 'string';
}