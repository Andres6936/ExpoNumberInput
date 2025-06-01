import React from 'react';

type ComponentPropsWithAsChild<T extends React.ElementType<any>>
    = React.ComponentPropsWithRef<T> & { asChild?: boolean };


export type {
    ComponentPropsWithAsChild,
}