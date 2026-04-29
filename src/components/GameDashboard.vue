<template>
    <div class="az-dashboard">
        <div class="az-dashboard__start">
            Score: {{ score }}
        </div>

        <div class="az-dashboard__center">
            Level: {{ level }}
        </div>

        <div class="az-dashboard__end">
            <GameDashboardLives :lives="lives" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import GameDashboardLives from '@/components/GameDashboardLives.vue'

import type { Lives } from '@/types/snake'

defineProps<{
    level: number
    lives: Lives
    score: number
}>()
</script>

<style lang="scss" scoped>
.az-dashboard {
    width: 100%;
    height: 24px;
    padding: 0 8px;
    display: grid;
    grid-template-columns: 240px 1fr 240px;
    align-items: center;
    background: $color-grey-200;
    font-size: 13px;
    color: $color-grey-400;

    &__start {
        justify-self: start;
    }

    &__center {
        justify-self: center;
    }

    &__end {
        justify-self: end;
    }
}
</style>