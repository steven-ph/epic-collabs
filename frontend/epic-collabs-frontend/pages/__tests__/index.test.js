import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Index from '..';

describe('Index Page', () => {
  beforeEach(() => cleanup());

  it('should show Epic Collabs', () => {
    const { getByText } = render(<Index />);

    expect(() => getByText('Epic Collabs')).not.toThrow();
  });
});
