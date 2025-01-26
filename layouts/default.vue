<!-- @format -->

<template>

    <div class="flex flex-col h-screen w-full min-w-[82%]">
      <ThreeScene />
      
      <div class="flex flex-col items-start h-auto w-full">
        <slot />
        
      </div>

      <AppFooter />
    </div>

</template>