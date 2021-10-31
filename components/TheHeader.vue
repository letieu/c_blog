<template>
	<header class="header main-header">
		<nav class="navbar container" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<nuxt-link class="navbar-item" to="/">
					<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
				</nuxt-link>

				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<nuxt-link to="/" class="navbar-item">
						Home
					</nuxt-link>

					<a class="navbar-item">
						Documentation
					</a>
				</div>
				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">
							<nuxt-link to="/write" class="button is-primary">
								<strong>Write</strong>
							</nuxt-link>
							<nuxt-link to="/login" class="button is-light">
								Log in
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
</script>
