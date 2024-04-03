import { ESActionHeadingComponent } from '../action-heading.component';
import { ESActionHeadingModule } from '../action-heading.module';
import { render } from '@testing-library/angular';

describe('ActionHeading', () => {
  it('Should render component with title', async () => {
    const { getByText } = await render(ESActionHeadingComponent, {
      componentProperties: {
        text: 'ActionHeading',
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true,
    });

    expect(getByText('ActionHeading')).toBeInTheDocument();
  });
});
