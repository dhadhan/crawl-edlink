<script>
	import './styles.css';
</script>

<div class="app">
	

	<main class="bg-gray-50">
		<slot />
	</main>

	<footer class="pt-12 bg-gray-50 sm:pt-16">
		<p>powered by sveltekit</p>
	</footer>
</div>

<style lang="postcss">

	
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}


	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
