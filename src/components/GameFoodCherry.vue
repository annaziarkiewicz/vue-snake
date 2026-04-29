<template>
	<svg viewBox="0 0 150 150">
        <path class="cls-1" d="M36.79,89.58C53.8,68.2,74,35.1,75.17,14c26.67,32.18,36.35,57.25,39.32,77.93"/>
        <path class="cls-2" d="M66.26,114.39c-5.38,16.45-24.23,29-40.69,23.6s-24.27-26.6-18.89-43s21.15-19.54,37.6-14.16S71.64,97.94,66.26,114.39Z"/>
        <path class="cls-2" d="M144.5,89c3,17-7.72,37-24.77,40s-34-12-37-29.08,9.45-27.19,26.49-30.2S141.49,71.94,144.5,89Z"/>
        <circle class="cls-3" cx="21.75" cy="92.79" r="7.32"/>
        <circle class="cls-3" cx="96.08" cy="89.27" r="7.32"/>
    </svg>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
svg {
    width: 40px;
    height: 40px;

    .cls-1 {
        fill: none;
    }

    .cls-1,
	.cls-2 {
        stroke: #000000;
        stroke-miterlimit: 10;
        stroke-width: 4px;
    }

    .cls-2 {
        fill: $color-rose-400;
    }

    .cls-3 {
        fill: $color-milk-200;
    }
}
</style>