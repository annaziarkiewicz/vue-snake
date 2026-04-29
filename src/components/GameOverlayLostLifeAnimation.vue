<template>
	<div class="az-lost-life">
		<svg class="az-lost-life__svg" viewBox="0 0 36 36">
			<path
				d="M13.589 26.521a1.5 1.5 0 0 1 .035-1.599l4.395-6.646l-5.995-5.139a1.5 1.5 0 0 1-.31-1.911l4.304-7.172a9.778 9.778 0 0 0-6.035-2.09c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c.025-.009.052-.022.077-.032l-4.488-7.481z"
			/>
			<path
				d="M26.018 1.966c-2.765 0-5.248 1.151-7.037 2.983l-4.042 6.737l6.039 5.176a1.5 1.5 0 0 1 .274 1.966l-4.604 6.962l4.161 6.935c6.338-3.529 13.621-11.263 14.809-18.649c.17-.721.268-1.469.268-2.241c-.001-5.452-4.419-9.869-9.868-9.869z"
			/>
		</svg>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.az-lost-life {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	&__svg {
		width: 0;
		height: 0;
		opacity: 1;
		transform-origin: center;
		animation: az-lost-life-grow-disappear 1s forwards;

        path {
            fill: $color-rose-200;
        }
	}

	@keyframes az-lost-life-grow-disappear {
		0% {
			width: 0;
			height: 0;
			opacity: 1;
		}
		35% {
			opacity: 1;
		}
		100% {
			width: 240px;
			height: 240px;
			opacity: 0;
		}
	}
}
</style>