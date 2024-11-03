import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './index';
import { act } from 'react-dom/test-utils';

describe('Card Component', () => {
  const props = {
    id: '1',
    imageUrl: '/test-image.jpg',
    title: 'Test Title',
    description: 'Test Description',
  };

  it('renders the Card component with given props', () => {
    render(<Card {...props} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title')).toBeInTheDocument();
  });

  it('shows loader initially and hides after image loads', async () => {
    render(<Card {...props} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title')).toBeInTheDocument();

    const linkElement = screen.getByText('Test Title').closest('a');
    expect(linkElement).not.toBeNull();
    const loader = linkElement?.querySelector('.loader');
    expect(loader).toBeInTheDocument();

    await act(async () => {
      const image = screen.getByAltText('Test Title');
      image.dispatchEvent(new Event('load'));
    });

    expect(loader).not.toBeInTheDocument();
  });

  it('displays "See Details" on hover', () => {
    render(<Card {...props} />);

    const linkElement = screen.getByText('Test Title').closest('a');
    expect(linkElement).toBeInTheDocument();

    act(() => {
      if (linkElement) {
        linkElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      }
    });

    expect(screen.getByText('See Details')).toBeInTheDocument();
  });
});
