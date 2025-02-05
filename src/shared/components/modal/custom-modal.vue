<template>
    <!-- Desktop Dialog -->
    <Dialog
    v-if="isDesktop"
    @update:open="emit('update:modelValue', false)"
    v-bind="{
      ...$attrs,
      ...(!showTrigger ? { 
        open: modelValue,
      } : {})
    }"
    >
      <DialogTrigger v-if="showTrigger">
        <Button variant="outline">
          {{ buttonText || 'Open Dialog' }}
        </Button>
      </DialogTrigger>
  
      <DialogContent :class="bigDesktop ? 'w-[90vw] h-[90vh] max-w-[90vw] flex flex-col' : 'max-w-lg'">
        <DialogHeader>
          <DialogTitle>{{ title }}</DialogTitle>
        </DialogHeader>
  
        <slot />
  
        <DialogFooter class="gap-2 sm:space-x-0">
          <template v-if="!showTrigger">
            <Button variant="outline" @click="emit('update:modelValue', false)">
              {{ secondaryText || 'Cancel' }}
            </Button>
          </template>
          <template v-else>
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </template>
  
          <Button
            variant="secondary"
            :disabled="loading || confirmDisabled"
            @click="handleConfirm"
          >
            {{ loading ? 'Loading...' : confirmText }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  
    <!-- Mobile Drawer -->
    <Drawer
    v-else
    v-bind="{
      ...$attrs,
      ...(!showTrigger ? { 
        open: modelValue,
        'onUpdate:open': (value:boolean) => emit('update:modelValue', value)
      } : {})
    }" >
      <DrawerTrigger v-if="showTrigger">
        <Button variant="outline">
          {{ buttonText || 'Open Drawer' }}
        </Button>
      </DrawerTrigger>
  
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{{ title }}</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
  
        <div class="p-4">
          <slot />
        </div>
  
        <DrawerFooter class="gap-2 sm:space-x-0">
          <template v-if="!showTrigger">
            <Button variant="outline" @click="emit('update:modelValue', false)">
              {{ secondaryText || 'Cancel' }}
            </Button>
          </template>
          <template v-else>
            <DrawerClose as-child>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </template>
  
          <Button
            variant="secondary"
            :disabled="loading || confirmDisabled"
            @click="handleConfirm"
          >
            {{ loading ? 'Loading...' : confirmText }}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
  } from '@/shared/components/ui/dialog'
  import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
  } from '@/shared/components/ui/drawer'
  import { Button } from '@/shared/components/ui/button'
  
  interface Props {
    title: string
    buttonText?: string
    confirmText?: string
    onConfirm?: (e?: Event) => void
    showTrigger?: boolean
    loading?: boolean
    secondaryText?: string
    confirmDisabled?: boolean
    bigDesktop?: boolean
    isFinalStep?: boolean
    modelValue?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    confirmText: 'Submit',
    showTrigger: false,
    loading: false,
    bigDesktop: false,
    isFinalStep: false,
  })
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  
  const isDesktop = ref(true)
  
  const checkDesktop = () => {
    isDesktop.value = window.matchMedia('(min-width: 640px)').matches
  }
  
  const handleConfirm = (e?: Event) => {
    e?.stopPropagation()
    props.onConfirm?.(e)
    if (props.isFinalStep) {
      emit('update:modelValue', false)
    }
  }
  
  
  onMounted(() => {
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkDesktop)
  })
  </script>