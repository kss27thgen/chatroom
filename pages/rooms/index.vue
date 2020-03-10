<template>
    <div class="container">
        <Select class="select-component" />

        <div class="main">
            <Sidebar class="sidebar" />

            <div class="main-board">
                <div class="posts">
                    <transition-group tag="ul" class="post-list">
                        <li class="post-list-item" :class="{ 'mine': myPost(post)}" v-for="post in filteredPosts" :key="post.id">
                            <div class="post-info">
                                <p class="post-info-name">
                                    {{ post.name }}
                                    <span class="post-info-time">({{ post.time | moment }})</span>
                                </p>
                            </div>
                            <div class="post-body">
                                <p>
                                    <img v-if="post.file" :src="post.file" width="150">
                                </p>
                                <p class="post-body-content">{{ post.content }}</p>
                            </div>
                        </li>
                    </transition-group>
                </div>

                <form class="form" @submit.prevent="saySomething">
                    <div class="input-group">
                        <input type="text" v-model="content" placeholder="say something.." class="input-content">
                        <div class="camera-group">
                            <label for="camera">
                                <font-awesome-icon :icon="['fas', 'camera']" class="icon icon-camera" /> 
                            </label>
                            <input type="file" id="camera" style="display:none;" @change="selectFile">
                        </div>
                    </div>
                    <button class="button-comment" type="submit">
                        <font-awesome-icon :icon="['far', 'comment-dots']" /> 
                    </button>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
import Select from '@/components/Select'
import Sidebar from '@/components/Sidebar'
import { db, storage } from '~/plugins/firebase'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export default {
    components: {
        Select,
        Sidebar
    },
    data() {
        return {
            content: null,
            file: null,
            fileName: null,
            posts: [],
        }
    },
    filters: {
        moment(value) {
            return moment(value).fromNow()
        }
    },
    computed: {
        filteredPosts() {
            return this.posts.filter(post => {
                return post.channelId === this.$store.getters['channel/currentChannel'].id
            })
        },
        // 未使用
        latestPost() {
            return console.log(this.posts[this.posts.length - 1])
        }
    },
    methods: {
        selectFile() {
            this.file = event.target.files[0]
            this.fileName = event.target.files[0].name
        },
        saySomething() {

            // when they have not select a channel
            if (this.$store.getters['channel/currentChannel'].id === undefined) {
                return alert('select a channel')
            }

            const id = uuidv4()
            const post = {
                id: id,
                name: this.$store.getters['user/currentUser'].name,
                content: this.content,
                time: Date.now(),
                channelId: this.$store.getters['channel/currentChannel'].id
            }

            // when there is a file with post
            if (this.file) {
                storage.child(`images/${this.fileName}`).put(this.file)
                .then(() => {
                    storage.child(`images/${this.fileName}`).getDownloadURL()
                    .then(url => {
                        post.file = url

                        db.collection('posts').doc(id).set(post)
                        .then(() => {
                            this.file = null
                            this.fileName = null
                        })
                    })
                })

            // when there is no file
            } else {
                db.collection('posts').doc(id).set(post)
            }

            this.content = null
            
        },
        myPost(post) {
            return post.name === this.$store.getters['user/currentUser'].name
        },
        scroll() {
            let scrollHeight = document.querySelector('.post-list').offsetHeight;
            document.querySelector('.posts').scroll({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }

    },
    created() {
        
    },
    mounted() {
        if (!localStorage.getItem('nn')) {
            return this.$router.push('/')
        }
        this.$store.dispatch('user/setCurrentUser', {
            name: localStorage.getItem('nn')
        })


        db.collection("posts").orderBy('time').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    console.log("Added: ")
                    this.posts.push(change.doc.data())

                    this.$store.dispatch('channel/livelyChannel', change.doc.data().channelId)
                    
                    setTimeout(() => {
                        this.$store.dispatch('channel/livelyChannel', null)
                    }, 2200)

                    setTimeout(() => {
                        this.scroll()
                    }, 1000)
                }

                if (change.type === "modified") {
                    console.log("Modified: ")
                }
                if (change.type === "removed") {
                    console.log("Removed: ")
                }
            });
        });
    }
}
</script>

<style lang="scss" scoped>
.container {
    .main {
        display: flex;

        .sidebar {
            display: none;
        }

        .main-board {
            width: 100%;
            .posts {
                height:100vh;
                border-left: none;
                padding: 3rem;
                overflow: scroll;
                padding-bottom: 13rem;

                .post-list {
                    display: flex;
                    flex-direction: column;

                    &-item {
                        margin-top: 2rem;
                        padding: 1rem 2rem;
                        border-bottom: 1px solid var(--color-lightgray);
                        font-size: 2rem;
                        width: 65%;
                        &.mine {
                            align-self: flex-end;
                        }

                        .post-info {
                            &-name {
                                font-family: fantasy;
                                font-size: 2.5rem;
                            }
                            &-time {
                                font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',Roboto, 'Helvetica Neue', Arial, sans-serif;
                                font-size: 1.4rem;
                            }
                        }

                        .post-body {
                            margin-top: 1rem;
                            padding-left: 1rem;
                            &-content {
                                word-wrap: break-word;
                            }
                        }
                    }
                }
            }
            
            

            .form {
                position: fixed;
                bottom: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--color-black);
                padding: 1rem;
                .input-group {
                    width: 83%;
                    position: relative;
                    input {
                        width: 100%;
                        font-size: 2rem;
                        padding: 1rem;
                        border: 1px solid white;
                    }
                    .camera-group {
                        position: absolute;
                        color: var(--color-blue);
                        font-size: 3rem;
                        top: .5rem;
                        right: 1.5rem;
                        label {
                            cursor: pointer;
                        }
                    }
                }
                .button-comment {
                    cursor: pointer;
                    width: 15%;
                    padding: 5px 0;
                    font-size: 3rem;
                    background: var(--color-blue);
                    color: var(--color-white);
                    border: 1px solid var(--color-blue);
                }
            }
        }
    }
    
}

@media (min-width:768px) {
    .container {
        .select-component {
            display: none;
        }
        
        .main {
            .sidebar {
                display: block;
                width: 35%;
            }
            .main-board {
                width: 65%;
                .posts {
                    border-left: 10px dotted var(--color-yellow);
                }
                .form {
                    width: 65%;
                }
            }
        }
    }
}

@media (min-width:992px) {
    .container {
        .main {
            .sidebar {
                width: 28%;
            }
            .main-board {
                width: 72%;
                .form {
                    width: 72%;
                    .input-group {
                        width: 89%;
                    }
                    .button-comment {
                        width: 10%;
                    }
                }
            }
        }
    }
}

@media (min-width:1200px) {
	.container {
        .main {
            .main-board {
                .form {
                    .input-group {
                        width: 92%;
                    }
                    .button-comment {
                        width: 7%;
                    }
                }
            }
        }
    }
}





/* Animation */
.v-enter {
    transform: translateY(-15px);
    opacity: 0;
}
.v-enter-active {
    transition: all 2s;
}

.v-move {
    transition: all 1s;
}


</style>