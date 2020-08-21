import React from 'react';
import { render, screen } from 'testUtils';
import Index from '../../pages';

describe('Index Page', () => {
  it('should show the heading', () => {
    render(<Index />);

    expect(screen.getByText('Find collaborators')).toBeInTheDocument();
  });
});
