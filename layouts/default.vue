<template>
  <div>
    <transition name="page">
      <nuxt />
    </transition>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 62.5%;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* page transition */
/* .page-enter, .page-leave-active {
	opacity: 0;
	transform: translateY(1rem);
}
.page-enter-active,
.page-leave-active {
	transition: all .5s;
} */

:root {
	--color-white: #fff;
	--color-black: 	#091116;
	--color-gray: 	#676767;
	--color-lightgray: #bbb8b8;

	--color-blue: #3879c7;
	--color-darkblue: #245ca0;
	--color-red: #690303;
	--color-lightred: rgb(212, 77, 77);
	--color-yellow: #ddb16b;
	--color-brown: #655050;
	--color-green: #849089;

}






@media (min-width:576px) {

}
@media (min-width:768px) {
	html {
		font-size: 65%;
	}
}
@media (min-width:992px) {

}
@media (min-width:1200px) {
	html {
		font-size: 70%;
	}
}

</style>
