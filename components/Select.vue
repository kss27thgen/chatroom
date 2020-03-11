<template>
    <div class="container">
        <client-only>
            <v-select class="select" :options="options"></v-select>
        </client-only>
        <button class="button" @click.prevent="openModal">
            <font-awesome-icon :icon="['fas', 'plus']" class="icon-plus" /> 
        </button>

        <div class="modal">
            <font-awesome-icon :icon="['fas', 'chevron-circle-up']" class="icon-minus" @click="closeModal" /> 

            <form class="form">
                <h4 class="form-title">create channel</h4>
                <div class="form-group">
                    <input type="text" placeholder="channel name">
                    <button type="submit">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </form>

        </div>

        <div class="overlay" @click="closeModal"></div>

    </div>
</template>

<script>
export default {
    name: 'Select',
    data() {
        return {
            options: [
                {label: 'Canada', val: 'ca'},
                { label: 'america', val: 'am' }
            ]
        }
    },
    methods: {
        openModal() {
            window.document.querySelector('.modal').classList.add('active')
            window.document.querySelector('.overlay').classList.add('active')
        },
        closeModal() {
            window.document.querySelector('.modal').classList.remove('active')
            window.document.querySelector('.overlay').classList.remove('active')
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    padding: 1rem;
    background: var(--color-yellow);

    .select {
        font-size: 2rem;
        flex: 0 0 80%;
        background: var(--color-white);
    }
    .button {
        flex: 0 0 20%;
        font-size: 2.5rem;
        cursor: pointer;
        outline: none;
        border: none;
        background: var(--color-yellow);
        .icon-plus {
            color: #fff;
        }
    }
    .modal {
        position: absolute;
        top: -100%;
        left: 15%;
        width: 70vw;
        height: 70vh;
        border: solid 5px var(--color-yellow);
        z-index: 5;
        border-radius: 4px;
        transition: .5s;
        padding: 3rem 1rem 1rem;
        background: var(--color-white);
        &.active {
            top: 10%;
        }

        .icon-minus {
            position: absolute;
            top: 3%;
            right: 5%;
            font-size: 3.5rem;
            cursor: pointer;
            color: var(--color-lightgray);
        }

        .form {
            &-title {
                text-align: center;
                font-size: 2.5rem;
                font-weight: 300;
                display: flex;
                flex-direction: column;
                text-transform: uppercase;
            }
            &-group {
                display: flex;
                margin-top: 3rem;
                input {
                    font-size: 2rem;
                    padding: 1rem;
                    width: 80%;
                }
                button {
                    width: 20%;
                    font-size: 2rem;
                    background: var(--color-blue);
                    color: white;
                }
            }
        }
    }
    .overlay {
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.705);
        transition: .5s;
        &.active {
            z-index: 3;
        }
    }
}

</style>