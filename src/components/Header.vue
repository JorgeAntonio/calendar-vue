<script setup>

</script>

<template>
    <nav class="flex justify-between items-center m-auto p-2 bg-transparent">
        <div class="flex items-center gap-4">
            <img src="/public/logo_fisi.png" alt="Flowbite logo" class="h-12">
            <h1 class="text-2xl font-bold text-blue-900">FISI - UNAP</h1>
        </div>
        <div class="flex items-center gap-4">
            <ul class="flex flex-wrap items-center mt-3 gap-3 text-sm font-medium sm:mt-0">
                <li>
                    <router-link to="" class="hover:underline">Acerca de</router-link>
                </li>

                <li>
                    <router-link href="#" class="hover:underline">Contactar</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
