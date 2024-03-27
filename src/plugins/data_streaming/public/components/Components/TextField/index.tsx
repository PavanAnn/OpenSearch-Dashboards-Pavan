/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiIcon } from '@elastic/eui';
import React, { useState } from 'react';
import { Append, Prepend, TextHelper } from '../styles';
import * as S from './styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /** *
   * Label is string that will be shown on the left side of the input.
   **/
  label?: string;
  /**
   * The error message to display when the input is invalid.
   * @default ''
   * @example
   * <TextField error="This is an error message." />
   * */
  error?: string;
  /** *
   * The help text is helpful when you want to show specific text to help user figure out what the field means.
   */
  help?: string;
  isDropDown?: boolean;
  percentage?: boolean;
  /** *
   * The append text is appended to the end of the input.
   * @default ''
   * @example
   * appendText: '@'
   **/
  append?: string | React.ReactNode;
  /** *
   * The prepend text is prepended to the beginning of the input.
   * @default ''
   * @example
   * prependText: '$'
   * */
  prepend?: string | React.ReactNode;
  /** *
   * The input ref is used to access the underlying input component.
   * @default null
   * @example
   * ref: (node) => {
   * this.input = node
   * }
   * */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * The character property is a simple way to show the number of characters the user has entered.
   * @default false
   * @example
   * countChar: true
   * */
  countChar?: boolean;
}

export const TextField = React.forwardRef(
  (
    { step = 1, max, min, error, help, countChar = true, ...props }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [touched, setTouched] = useState(false);
    if (props.percentage && props.type !== 'number') {
      // eslint-disable-next-line no-console
      console.error(`To use percentage mode the input must be number type`);
    }

    function handleIncrease(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      if (props.onChange) {
        const value = props.value ? Number(props.value) : 0;
        if (typeof max === 'undefined' || value < Number(max)) {
          props.onChange({
            target: {
              value: incrementNumber(value).toFixed(value.toString().split('.')[1]?.length ?? 0),
              name: props.name as '',
            },
          } as any);
        }
      }
    }

    function handleDecrease(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      if (props.onChange) {
        const value = props.value ? Number(props.value) : 0;
        if (typeof min === 'undefined' || value > Number(min)) {
          props.onChange({
            target: {
              value: decrementNumber(value).toFixed(value.toString().split('.')[1]?.length ?? 0),
              name: props.name as '',
            },
          } as any);
        }
      }
    }

    const incrementNumber = (value: number) => {
      if (value > -1 && value < 0) {
        return value * -1;
      }

      return value + Number(step);
    };

    const decrementNumber = (value: number) => {
      if (value > 0 && value < 1) {
        return value * -1;
      }

      return value - Number(step);
    };

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setTouched(true);
      if (props.onBlur) {
        props.onBlur(e);
      }
    }

    return (
      <S.FieldsetContainer error={touched && !!error} disabled={props.disabled}>
        {props.type === 'number' && (
          <S.Decrease
            type="button"
            onClick={handleDecrease}
            title="Decrease"
            disabled={props.disabled}
          >
            <EuiIcon type="minus" />
          </S.Decrease>
        )}
        {props.prepend && <Prepend data-testid="prepend">{props.prepend}</Prepend>}
        <S.Fieldset>
          <S.Input {...props} ref={ref} id={props.name} onBlur={handleBlur} />
          <label htmlFor={props.name}>
            {props.label}
            {props.required && <span> *</span>}
          </label>
        </S.Fieldset>
        {props.append && <Append data-testid="append">{props.append}</Append>}
        {props.type === 'number' && (
          <S.Increase
            type="button"
            onClick={handleIncrease}
            title="Increase"
            disabled={props.disabled}
          >
            <EuiIcon type="plus" />
          </S.Increase>
        )}
        <TextHelper>
          <span className="error" title={error}>
            {touched && error}
          </span>
          {(!error || !touched) && <span className="help">{help}</span>}
          {props.maxLength && countChar && (
            <span className="character-count">
              {!!props.value || !!props.defaultValue
                ? String(props.value || props.defaultValue).length
                : 0}
              /{props.maxLength}
            </span>
          )}
        </TextHelper>
      </S.FieldsetContainer>
    );
  }
);
