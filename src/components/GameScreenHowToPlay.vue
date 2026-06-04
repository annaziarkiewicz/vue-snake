<template>
    <section class="az-how-to-play">
        <div class="az-how-to-play__heading">How to play</div>
        <div class="az-how-to-play__close" @click="emit('close')">✕</div>

        <div class="az-how-to-play__content">
            <div class="az-how-to-play__description">
                This is a classic snake-style arcade game where you navigate a growing snake to collect food while avoiding walls and your own body.
                Eat cherries to score points, gain extra lives from hearts, and manage your length with scissors to survive longer.
                Progress through levels by reaching target scores as the pace and challenge increase.
            </div>

            <div class="az-how-to-play__row">
                <div class="az-elements">
                    <div class="az-elements__heading">Game elements:</div>

                    <div class="az-elements__item">
                        <div class="az-elements__item-tile">
                            <GameTile :tile="48" :x="0" :y="0" />
                        </div>
                        <div class="az-elements__item-name">wall</div>
                    </div>

                    <div class="az-elements__item">
                        <div class="az-elements__item-tile">
                            <GameFoodCherry/>
                        </div>
                        <div class="az-elements__item-name">cherry</div>
                    </div>

                    <div class="az-elements__item">
                        <div class="az-elements__item-tile">
                            <GameFoodScissors/>
                        </div>
                        <div class="az-elements__item-name">scissors</div>
                    </div>

                     <div class="az-elements__item">
                        <div class="az-elements__item-tile">
                            <GameFoodHeart/>
                        </div>
                        <div class="az-elements__item-name">heart</div>
                    </div>

                    <div class="az-elements__item">
                        <div class="az-elements__item-tile" style="width: 96px">
                            <img
                                src="data:image/png;base64,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"
                                alt=""
                            />
                        </div>
                        <div class="az-elements__item-name">snake</div>
                    </div>
                </div>

                <div class="az-controls">
                    <div class="az-controls__heading">Game controls:</div>

                    <div class="az-controls__item">
                        <div class="az-controls__arrows">
                            <div>
                                <GameScreenKey key-type="arrow">▲</GameScreenKey>
                            </div>
                            <div>
                                <GameScreenKey key-type="arrow">◀</GameScreenKey>
                                <GameScreenKey key-type="arrow">▼</GameScreenKey>
                                <GameScreenKey key-type="arrow">▶</GameScreenKey>
                            </div>
                        </div>
                        <div class="az-controls__item-name">control snake movement with arrow keys</div>
                    </div>
                </div>

                <div class="az-shortcodes">
                    <div class="az-shortcodes__heading">Keyboard shortcodes:</div>

                    <div class="az-shortcodes__item">
                        <GameScreenKey key-type="letter">M</GameScreenKey>
                        <div class="az-shortcodes__item-name">open menu</div>
                    </div>

                    <div class="az-shortcodes__item">
                        <GameScreenKey key-type="letter">P</GameScreenKey>
                        <div class="az-shortcodes__item-name">pause / resume</div>
                    </div>

                    <div class="az-shortcodes__item">
                        <GameScreenKey key-type="letter">R</GameScreenKey>
                        <div class="az-shortcodes__item-name">restart game</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import GameTile from '@/components/GameTile.vue'
import GameFoodCherry from '@/components/GameFoodCherry.vue'
import GameFoodScissors from '@/components/GameFoodScissors.vue'
import GameFoodHeart from '@/components/GameFoodHeart.vue'
import GameScreenKey from '@/components/GameScreenKey.vue'

const emit = defineEmits<{
	(e: 'close'): void
}>()
</script>

<style lang="scss" scoped>
.az-how-to-play {
    position: absolute;
    inset: 0;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    padding: 24px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 24px;
    background: $color-milk-200;

    &__heading {
        font-size: 48px;
        font-weight: 700;
        line-height: 1em;
        color: $color-navy-200;
        text-transform: uppercase;
    }

    &__close {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        background: $color-navy-200;
        color: $color-milk-200;

        &:hover {
            background: $color-navy-300;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 48px;
        color: $color-grey-400;
    }

    &__description {
        font-size: 20px;
        line-height: 1.5em;
        text-align: justify;
    }

    &__row {
        display: flex;
        flex-direction: row;
        gap: 48px;

        [class$='heading'] {
            margin-bottom: 8px;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.35em;
            text-transform: uppercase;
        }

        [class$='item'] {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
        }

        [class$='name'] {
            font-size: 15px;
            line-height: 1.5em;
        }
    }

    .az-elements,
    .az-controls,
    .az-shortcodes {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .az-elements,
    .az-shortcodes {
        width: 200px;
    }

    .az-elements {
        [class$='item-tile'] {
            width: 48px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .az-tile {
            position: relative;
        }
    }

    .az-controls {
        width: calc(100% - 448px);

        [class$="item"] {
            flex-direction: column;
            align-items: flex-start;
        }

        &__arrows {
            width: 136px;
            height: 68px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;

            > div {
                display: flex;
                gap: 8px;
            }
        }
    }
}
</style>