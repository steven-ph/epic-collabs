import React from 'react';
import { render, screen } from 'testUtils';
import Index from '../../pages';

jest.mock('@react-spring/parallax', () => ({
  Parallax: ({ children }) => <div>{children}</div>,
  ParallaxLayer: ({ children }) => <div>{children}</div>
}));

jest.mock('../hooks/use-project.js', () => ({
  useGetProjects: jest.fn().mockResolvedValue({
    projects: []
  })
}));

describe('Index Page', () => {
  it('should show the heading', () => {
    render(<Index />);

    expect(screen.getByText('Find collaborators')).toBeInTheDocument();
  });
});
