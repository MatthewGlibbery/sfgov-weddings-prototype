import {
  BodyText,
  Button,
  Container,
  DisplayXXXl,
  PageLabel
} from '@/design-system'
import { PrototypeLayout } from '@/components/weddings'
import { useBookingParams } from '@/components/weddings/hooks/useBookingParams'

export default function WeddingsChallengePage() {
  const { withParams } = useBookingParams()

  return (
    <PrototypeLayout title="Challenge the hold">
      <Container as="section" className="pt-32 pb-80">
        <PageLabel label="CHALLENGE THE HOLD" />
        <DisplayXXXl as="h1" className="!mb-16 mt-12">
          Challenge the hold
        </DisplayXXXl>
        <BodyText as="p" className="text-neutral700 max-w-[902px] !mb-32">
          The challenge flow content will go here once the design is provided.
        </BodyText>
        <Button as="a" href={withParams('/weddings')} variant="secondary">
          Back to availability
        </Button>
      </Container>
    </PrototypeLayout>
  )
}
