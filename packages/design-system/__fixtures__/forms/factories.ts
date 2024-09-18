import type {
  ComponentSchema,
  FormSchema,
  PageSchema,
  WizardFormSchema
} from '../../formio/types'
import { factory, type FakerType } from 'node-factory'

export const FormFactory = factory<FormSchema>((fake) => {
  const name = fake.lorem.words(2)
  return {
    type: 'form',
    display: 'form',
    name,
    path: fake.helpers.slugify(name),
    _id: formioId(fake),
    project: formioId(fake),
    owner: formioId(fake),
    components: ComponentFactory.make(3)
  }
})

export const WizardFactory = factory<WizardFormSchema>(() => {
  let i = 1
  return FormFactory.make({
    display: 'wizard',
    components: PageFactory.make(3, () => ({
      title: `Page ${i++}`
    }))
  }) as WizardFormSchema
})

export const ComponentFactory = factory<ComponentSchema>((fake) => {
  const label = fake.lorem.words(2)
  return {
    type: 'textfield',
    label,
    key: fake.helpers.slugify(label)
  }
})

export const PageFactory = factory<PageSchema>((fake) => {
  const title = fake.company.catchPhrase()
  return {
    type: 'panel',
    title,
    key: fake.helpers.slugify(title),
    components: ComponentFactory.make(2)
  }
})

export function makeComponent(type: string, props?: Partial<ComponentSchema>) {
  return ComponentFactory.make({ type, ...props })
}

function formioId(fake: FakerType) {
  return fake.datatype.hexaDecimal(17)
}
