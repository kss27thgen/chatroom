<template>
    <div class="container">
        <form class="form" @submit.prevent="createChannel">
            <input type="text" placeholder="create channel" v-model="channelName" maxlength="25">
            <button type="submit">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </form>
        <p v-if="feedback" class="feedback">{{ feedback }}</p>

        <transition-group class="channels" tag="ul">
            <li v-for="channel in channels" :key="channel.id" class="channel" :class="{'current-channel': currentChannel(channel), 'lively-channel': channel.id === $store.getters['channel/livelyChannel']}">
                <p class="channel-name" @click="setChannel(channel)"># {{ channel.name }}</p>
                <button class="channel-times" @click="deleteChannel(channel)">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </button>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'Sidebar',
    data() {
        return {
            channelName: '',
            channels: [],
            feedback: ''
        }
    },
    methods: {
        createChannel() {
            this.feedback = ''
            if (this.channels.length >= 7) {
                return this.feedback = 'We can only have 7 channels.'
            }
            if (this.channelName.trim().length === 0) {
                return this.feedback = 'Invalid channel name'
            }
            const id = uuidv4()
            db.collection('rooms').doc(id).set({
                name: this.channelName,
                id: id,
            })
            .then(() => {
                this.channelName = ''
            })
        },
        setChannel(channel) {
            this.$store.dispatch('channel/setCurrentChannel', channel)

            setTimeout(() => {
                this.scroll()
            }, 1000)
        },
        deleteChannel(channel) {
            if (confirm(`Delete ${channel.name} channel, are you ok?`) ) {
                db.collection('rooms').doc(channel.id).delete()
            }
        },
        currentChannel(channel) {
            return channel.id === this.$store.getters['channel/currentChannel'].id
        },
        scroll() {
            let scrollHeight = document.querySelector('.post-list').offsetHeight;
            document.querySelector('.posts').scroll({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }
    },
    mounted() {
        db.collection("rooms").onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    console.log("added")
                    this.channels.unshift(change.doc.data())
                }
                if (change.type === "modified") {
                    console.log("Modified")
                }
                if (change.type === "removed") {
                    this.channels = this.channels.filter(channel => {
                        return channel.id !== change.doc.data().id
                    })
                }
            })
        })
    }   
}
</script>

<style lang="scss" scoped>
.container {
    background: var(--color-yellow);
    height: 100vh;
    overflow-y: scroll;
    padding: 3rem 2rem;
    .form {
        width: 100%;
        display: flex;
        input {
            width: 80%;
            padding: 1rem;
            font-size: 2rem;
        }
        button {
            width: 20%;
            font-size: 2.5rem;
            cursor: pointer;
            background: var(--color-blue);
            color: var(--color-white);
            border: 1px solid var(--color-blue);
        }
    }

    .feedback {
        color: var(--color-lightred);
        font-size: 1.4rem;
    }

    .channels {
        margin-top: 6rem;
        font-size: 2rem;
        width: 100%;

        .channel {
            background: var(--color-white);
            border-bottom: 1px solid var(--color-gray);
            display: flex;
            width: 100%;

            &.current-channel {
                font-weight: bold;
            }

            &.lively-channel {
                animation: lively-channel 1s 2;
            }

            &:last-of-type {
                border: none;
            }
            &-name {
                width: 80%;
                padding: 1rem;
                cursor: pointer;
                word-wrap: break-word;
            }
            &-times {
                width: 20%;
                font-size: 2.5rem;
                cursor: pointer;
                background: var(--color-lightgray);
                color: var(--color-white);
                border: 1px solid var(--color-white);
                outline: none;
            }
        }
    }
}

.v-enter {
    opacity: 1;
    transform: translateX(-1rem) translateY(-2rem) scale(1.3);

}
.v-enter-active {
    opacity: 0;
    transition: all 1s;

}

.v-move {
    transition: all .6s;
}


@keyframes lively-channel {
    from {
        background: pink;
        color: white;
    }
    to {
        background: var(--color-white);
    }
}
</style>