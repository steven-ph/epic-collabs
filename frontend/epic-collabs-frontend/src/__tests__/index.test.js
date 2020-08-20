import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '../../pages';

describe('Index Page', () => {
  it('should show the heading', () => {
    render(<Index />);

    expect(screen.getByText('Find collaborators')).toBeInTheDocument();
  });
});
