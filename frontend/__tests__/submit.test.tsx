import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SubmitIncidentPage from '../app/submit/page'

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        };
    },
}));

describe('SubmitIncidentPage', () => {
    it('renders the submission form with key fields', () => {
        render(<SubmitIncidentPage />)

        expect(screen.getByRole('heading', { name: /submit an incident/i })).toBeInTheDocument()

        expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/object type/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/jump type/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/deploy method/i)).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /submit incident/i })).toBeInTheDocument()
    })
})
