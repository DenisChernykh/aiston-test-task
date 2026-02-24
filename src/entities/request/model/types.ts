export type RequestStatus = 'new' | 'inProgress' | 'ready' | 'closed' | 'paused' | 'awaitingParts'

export type RequestPriority = 'critical' | 'high' | 'medium' | 'low'

export type RequestSlaState = 'ok' | 'neutral' | 'breach'

export type RequestItem = {
  id: string
  number: string
  pharmacyCode: string
  pharmacyCity: string
  pharmacyAddress: string
  createdAt: string
  priority: RequestPriority
  topic: string
  category: string
  technician: string | null
  reactionTime: string | null
  reactionState: RequestSlaState
  resolutionTime: string | null
  resolutionState: RequestSlaState
  status: RequestStatus
}

export type ListRequestParams = {
  status?: RequestStatus
  search?: string
}

export type CreteateRequestPayload = {
  pharmacyId: string
  categoryId: string
  topic: string
  priority: RequestPriority
  description: string
  isWarranty: boolean
  attachments: string[]
}

export type SelectOption = {
  value: string
  label: string
}

export type PriorityOption = {
  value: RequestPriority
  label: string
  hint: string
}
export type RequestFormOptionsResponse = {
  pharmacies: SelectOption[]
  categories: SelectOption[]
  priorities: PriorityOption[]
}
