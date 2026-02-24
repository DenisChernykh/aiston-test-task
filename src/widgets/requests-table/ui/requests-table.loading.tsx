import { Box, HStack, Skeleton, SkeletonText, useBreakpointValue, VStack } from '@chakra-ui/react'

function DesktopSkeleton() {
  return (
    <Box px="40">
      <Box borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="border.subtle">
        <Box h="40px" bg="bg.surface" borderBottomWidth="1px" borderColor="border.subtle" />{' '}
        <VStack gap="0" align="stretch">
          {Array.from({ length: 7 }).map((_, index) => (
            <HStack
              key={`desktop-skeleton-row-${index}`}
              h="40px"
              px="10"
              borderBottomWidth="1px"
              borderColor="border.subtle"
              align="center"
            >
              <Skeleton h="12px" w="72px" />
              <Skeleton h="12px" w="180px" />
              <Skeleton h="12px" w="120px" />
              <Skeleton h="12px" w="96px" />
              <Skeleton h="12px" w="220px" />
              <Skeleton h="12px" w="140px" />
              <Skeleton h="12px" w="120px" />
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

function MobileSkeleton() {
  return (
    <VStack px="16" align="stretch" gap="12" pb="120">
      {Array.from({ length: 4 }).map((_, index) => (
        <Box
          key={`mobile-skeleton-card-${index}`}
          borderWidth="1px"
          borderColor="border.muted"
          borderRadius="lg"
          px="14"
          py="15"
        >
          <SkeletonText noOfLines={2} gap="3" />
          <HStack mt="12" justify="space-between">
            <Skeleton h="24px" w="88px" />
            <Skeleton h="14px" w="76px" />
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}

export function RequestsTableLoading() {
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false

  if (isDesktop) {
    return <DesktopSkeleton />
  }

  return <MobileSkeleton />
}
