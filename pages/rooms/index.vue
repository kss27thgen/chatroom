<template>
    <div class="container">
        <Select class="select-component" />

        <div class="main">
            <Sidebar class="sidebar" />

            <div class="main-board">
                <div class="list">

                </div>

                <form class="form">
                    <div class="input-group">
                        <input type="text">
                        <div class="camera-group">
                            <label for="camera">
                                <font-awesome-icon :icon="['fas', 'camera']" class="icon icon-camera" /> 
                            </label>
                            <input type="file" id="camera" style="display:none;">
                        </div>
                    </div>
                    <button class="button-comment">
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

export default {
    components: {
        Select,
        Sidebar
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch('user/setCurrentUser', {
            name: localStorage.getItem('nn')
        })
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
            .list {
                height: 100%;
                border-left: 10px dotted var(--color-yellow);
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
</style>