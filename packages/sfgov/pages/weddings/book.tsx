import {
  BodyText,
  Button,
  Container,
  DisplayXXXl,
  PageLabel
} from '@/design-system'
import { PrototypeLayout } from '@/components/weddings'

export default function WeddingsBookPage() {
  return (
    <PrototypeLayout title="Request a hold">
      <Container as="section" className="pt-32 pb-80">
        <PageLabel label="REQUEST A HOLD" />
        <DisplayXXXl as="h1" className="!mb-16 mt-12">
          Request a hold
        </DisplayXXXl>
        <BodyText as="p" className="text-neutral700 max-w-[902px] !mb-32">
          Form fields and confirmation flow will go here once the design is
          provided.
        </BodyText>
        <Button as="a" href="/weddings" variant="secondary">
          Back to availability
        </Button>
      </Container>
    </PrototypeLayout>
  )
}
