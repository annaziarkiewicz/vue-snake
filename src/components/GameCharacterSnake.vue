<template>
	<div class="az-snake">
		<div
			v-for="(segment, i) in segments"
			:key="i"
			class="az-snake__segment"
			:style="{
				transform: `translate3d(${segment.x}px, ${segment.y}px, 0) rotate(${segment.rotation}deg)`
			}"
		>
			<svg v-if="segment.type === 'head'" viewBox="0 0 48 48" class="az-snake__svg">
				<image
					xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAC4jAAAuIwF4pT92AAAZ20lEQVR4nO1dCZScVZX+/tr3pau7eku6EzoLkABpSDhh8zA4KBIOigNnAJWAIOowIqBDABecOTpz8Iw6gzM6Z8ZzlPEcB3QAl0E8REVAliCGAFlIQkjSW3VXdW1d1bV0LW/OfV23fPn9qzcI6W769nld//L+pe733r333XffLU0IgSU6cWQ6gc9eoiUATjwtAXCCydL/jf95Rx70D8WiTdO0tUKI5ZqmWU0mU9lsNmdNJpNWrVZNZrM5YrVaB24rFjN4F5HleNz0nnSa7ruhUqlcKITYIIQ4WQjRVa1WW6rVKlTFL4SApmkwm820m70DiDscjpjD4Tjocrl+73Q6t9+SzR7EIiWt759/9Lbc6K5kskUI8SEhxJVCiNOr1WobMZsKETOemc+MF0LIcyaTCZVK5Zh6BIrVaoXdbj/g9/t3hEKhnzmdzidvHB1NYJHQWwZgWyLxASHE7UKI84UQTj2T9UU9Xq0BxABYLBZZ1PpqHQLD5XLl3G73vubm5od8Pt8D10UiUSxg0qYbBzTSEdsSiSuEEPcKIc7gY0YMNgJA7RlC9/xai6/XYfHEPaRUKslCx10uV6GlpeXxcDj8lY/HYq/i3QDAnfH4ZgDfAdBL+3p5rme+ymhmKosfInWb9x0OB5xOZ10k8XkCgQodK5fLKBQKso7H40FLS8sTra2tn78hGn0NixWAO+PxfwVwK+/rr20kZqjFEsOYmSrziVgXEHN5mwDwer1yXw8cg0pE9+VeQUC0t7d/NxQKfe66SCSPxQDAtV/4904hxKkAiPmnqOf016otmRlNdVh0TExMyE/1elE7r2/lRARCMBiUekEVZ3xfYj5dy4X26VwoFOrr7Oy896Z4/AeY56Rdffe3p0SAv+yMb6jUZ2YxU1lsMBCVmojhnqH2CKpP+zabDW63W4olVtKkJ1SRRveje/Ex2qY6zc3N/9ve3r71ukgkh3lK5vUXXPqV43FjZgb3BGJ8Pp//M8ZXFXHCxGDQJ9XP5XIoFov1Vs8tnZQzFQKFQWYxRtdlMplTs9nsxw61t+8+K59/E4sZALXVc2tkUZLJZJBKpSQA1FqZuRVFyfL1zEAWSfS/XKkgmckjGk8jlkghmR5DPjeOSrlUHy8wCHwtA5TL5fyxWOy6PYEAzhXiKSxGAFTly1+cRAcdSyaTEgAyLUmpulwuySz1OlEDhEUPMZ2ASY1PIJ0rwuNyYH1PJzaduhKru9rg8ziRyozjyNAoYok0zCbAabdB044FgAq9BwE9NDR04QsWy2l9XV2P9Y6P/0kRLRZXhNoCCQBq6dTqabu9vV3KcJLLbMWQWMnn88hms1I8qeKjKoCK2YZNJ7dJpp+1fg16loXhdTlRrlSRyxdxdHgUbwzEcKg/gt/t3Idnd+5Fz/I2dLQ21/UH9yLSIbQ9MDDwV7lc7rQHenuv2jo8/OqCUMJTXqxYLqrYoBY3NjYmQaFWzwqYxQ0dJ2DK5TLS6bQsBNhkDzDDGwhi85p2nLemBWesOxmBcAfS2TzyhSJMJg1mkwlupx0et0PKqP2HBrD9xT346ZMvIZbO4bQ1K2CzWqXoUn1NBHQkEqFeWOnt7b3yU+n0T7EQRdAxMloxN1UdwCNaNkH1I2HWEY5azyDm0PF8fgJBvxfvOaV98lphgtXuQKVK1xFDAQGB4kQJ6cw40pk8lre14JwNp+D9m0/D4cFhvLTnTfg9LlitlmPMXHofel4qlTINDQ1d/XooVDpf057BQgSAiRUtk6oLWMnycfUcg2CxWKReYBOV2JtIj+OU5SE0eRwoC4GmQABmixUa/Zk0lMsVCVJLqAlelwOR6CgOHu5De8iHKy4+H/lCHo8/8zKagz6pA3gwSJ8EAD2PxN/AwMB7X3a5eodWrnztjEwmhoWgA4yYr3ct6Ee4+jrsfBNCSNFDPcDn80llLfXDeB5/OBjByrAfo/EkhiIRrFqzBg6HB1YSJcUiDh0dwOuH+rDjlf3YffAo0ukMTGYTrrj4PPzdTVdhcCSO7Tv24qz1qyXIPBCkdyAQWltbkUgksHfv3g+OjIx8cHDVqu96PJ5f+ny+l66LRIYxH3uA0UhXPa73C/E5dVu9VlPEFytoUs52qwkHB+PwuJxYEfZicHgUTQEfOtpaYTGTlVTFtvv+C1/9zoPoG4pholyRTM4VS/jRw9ulIr775r/GY8/sRDydgcftqvuPqBD41DNopE0Kenx8HP39/Zsikci18Xj81j86nZt2ud3WvcFgsTeXi2M+9ACV+UR6S0NlPpuTjSZfjIAQQsDv90vRQD3BZTPhkWd2I+ixY22bD6/v2werzQZ/IAhRLsrruzrCaA8HpV4gcjrsaA6HcGhwBJrJhKvetxn3/eAXCPrcMJstdV1Aoo5H2WQkUI8g4AmIZDJpi8Vil9tstsvpfQ56vc/bbLbHnU7nq8FgcP8nU6nXcaLN0OmYrw6qVG+mWke1+5moFYdCoUl3M1lTooCHfrcH11x0Gta0efHpL34TVpcPnS1B7D8yhNaWQJ35dC9SzHTg/DMnXVYXbliFH4d9cqzQ2Raui0cSRUTs5mZrjYBgNwl9EiDpdPqcarV6Ts39jW3B4MsOh+NXPp/v936//4mb4vEyjrcI0oseNjuJpvMTNRI7zHiTYsJyq6RCTLBbzMgXCtjdP4rB+DgiwwlERqI43D8Cn9ctzVFRu0epVMZr+4/gtq2X46arL0MsnkJbkw+7Dw1g14F+tLU01UWQqocIBLXB8KiaRCIVdo2zMh8bG2tPp9MXxOPxj2Sz2et3Op2enU5ncXO5PHhcADASPUxGzNfLeyPm64HRiyf60lQIBItJQ6VUwsDoGDwep7R6XA6btJZAQGoakpkcYvE0br/+Q7j3thuQzRUwnsvB63HhcCSO53fth9ftOKZHsh+KGK43pYm4Z/AAkeqRGctg1Exnfzwev2hsbOymF222Tbs8nsLmSmUfjpcImqrVGx2bypOqupWZVD8S+fbpS8diMcloq7UkR8iazQGzuQxRKaNaqSBfnIDbYcV1W96Hz998JcbGMsjmi7DZ7LDYrAgHvDBpkCNuuic/hwoBTDqHmFoLCpBUH5HXeol6DRG7UrhX0PFoNLplYGBgy+cDgV1dXV1fvjWf/wWOhw4wsnRm04Ma3U9TvjB9kqKkFtfR0SH9ScTAiWIRlapAleqazNDMVaxuD+EvN67BhjXL8fTTz8LmcCAQDMFmt6Hq1pAZz6FcnZT75FGllqt6YNnLSs9ixqrvzR5XflfuOdRQ+DwRu8yTyeSGkZGRn9/V2fnLNWvWXPPxWGzsLYsgVTzMZm5gJqQZKGh+Bn1J+oKsIE1SXEw660BMJNkPE/YPJrDr4BD6oklERpNIpTPSqkmms3jylcMYjCZhs0wCzAxVQeDJHPWYasGpeo91BL+neg2d4940MjKyOpFIbB1ZvfrJ3lxu+C35go4X85mm0hdceJxAPYNKuTYNWShOYDyfRzpbQIVGulaLlPdulxOlckX6g6Qe0fmF2ALSu8HVeQWuw9eohgMHCVDP0ofSsJ8rHo/La88999zLbk4mH8NcZ8TeCdIagKDuM1PYzSEEDa4mmcATPRMTJeRqkz+0T25qnkFjUpnFjkH1OUQqEPrJHhUg/Yycei3VJecfHb/44otPvX5kZN87Ehk3FxIG4wp9xIQ+SoJ7Bs898HE2N4kxDI5qghJxq2XRo1pDqnjROxH5uQwAPZ/nrNX353uSK76vrw87duz47fUrVrTPWwAauS/4uMoYI72hbhNz2GRUJ+05eoKZzlaX/j7qJBHv8yhatYrYyccNQe0FRAxCZ2cnTQi1fTEUeuSrXu+H39I44J0izeC5as/QH1eLaqmowV3sIufCgyz6pF7Ek/766U39VKeeeMzAlpy+AXEv6evrO+Xo8uX5c4V4tn4t5ikJpevz/nRRd40Kg8GF5yKIKcR4AoPMSLK21EKuBzqvKmD9nAYznXQObaviSO21NAYhsPft23fff7e3nz4vRZARzcTnxPuNrp/uuJG7hBU0g8gizCiSg/ZprEJgURwTW1eq1UWfdG5oaAhvvPHGfXC7PzCve4BKams2OjZVjzC6j57U3sUM5qAvZnYtMPiYwjY/izOaX+AABLau1IZCx+iaTCbz/u+FQs0LBgCVGjFXf266elNda1RPbfksulhv0HFq3QTK6OioBEE1mfVWUy6X08bHx29ckACoNJXcV8/r5yWMrtWfM9rWu8/5vuTOoO2enh6pO4aHh6XrRG/aEmCTntsSubovXRA6YK40FVON9IaRTlCVbKM5DRZNPN25YsWK+ghYdduzXuB1DmNjY+d9f+3a5YsWgJlQIyU+lehixpN+YAYTQ2lbTqfa7XJSiZ18XJ9EFVlKpFtq06DmdDp9/bsagJmCoa+nuqtV9wOJHJ5No3M8NmBLiMMy6ThtZzKZdQtaBxwvmkqfGJ1XxQwRix818rs2m1b3E1GvKZVKviUAZkCNmK+voxIpXDZBa0HC0jriOYeaN9W1BMAcSe/2YGIPKcl6dqFTIQB4foOBEUJYlgCYAzXySenFD8t7YjxFWLAuUGkJgDmS0SBNXXLLxNYPFeoRKgCy7lxfYIn+REbuayJWvnqrSOlBYgmAWZDKWEWO18/r5wt4rMD7DJCqM5YAmAMZMV4FhLY5CkOdezayoJYAmCVN5d7mc+pCQuoFvAaC5yPU+ywBcBxA4OlL2iYgCACakFGTkdTEkbYEwBxJH7WhfnLrZ5cFzwPwuEG5h7bkC5oD6RnO2yxymOkqSNQLSB+oIkjTtCUraKbUaFJeP/dL9j77fzgeiRx0HADAvYM+zWbz+BIABow0Kkb1eJ+IxA3b++xu4LAVKnSe3NBqiIzdbo++60SQNsMwm0b1jMDgWS4CgFo5T1Oqo2JeOUrgkHlK1zU1NT276HuANkVrbnTeKEpCHWSpc7y8BpoKh9RHo9H6vDARW0YcH0SxrV6vt+z3+x961/UAIiMQpiIjQHhwxSKGZDyBcOTIEbkfDoePCWUkYtBIT1AOvI8ODiYti8EtYERGx2fDeL2oUbe51fMCdJ7hOnr0qGzpFA+qKlyehGEzlM5RzjukUgt3Ul6bIfP0+7MFQe9oYwVKzOXJFmIqhaPQJ7V8UrbqdKU6QCP539raGv1kKvVtOmdZrEp0pgw3GkzpHWfs31fDG4lYxhNTiVpaWuSCc66jX09H9Qi8UCj0IB9fEABo04iTRq4BI9HR6Jg+FkhNKkWkRsvxxDwRhzBSYBZFRBg56pgoe0wwGCx0d3d/CX198x8AbZrWOp1e4E+2y43qqCHr7LvhFq5aPkb3ZYXMS1qJ1IRUDCzdgwK16N7r1q27+pq+vvq6sXkLgGYgt43MSP6CariIGi7OlgrH5HCArdqqVQcZA6RPg9YoRJ22eZbLKC0nEQFKrb+np+c/bslmf6a+v2UhMV6bItcEf/IMFOUg4mVLaqCtOjBSwdIvU+VP1exUP9nfozJfDeZVvwMp6KampoP3Ohyf1n/faQHQo3kiGW+q2dHqF6ZBDSf1Y1GSzeWRzU0qRp9rMv5fb79zVLOesdwD1DUB+hhPZr56jV50ceGsYRs2bNiC4T9fLGmZ76JGU2L1ef0wZ2DM53JyQR4l9JsoleWCbJfTiXAoiJNXuuUi7kSmABOOjWDjqGYjRW7EYFUP6AEjYtFGpDYQCsSi+27cuPGSrcPDhhngpwXgeLX+6VwCRKzg6MtSWAfnmKMi7fGqgN/txNrlYTS5rXBaLfB5vehqC2JNVxu6lnfi248+h5/+5gUE3JOrJclG5yWmKtPVlY8sWlRlyuKL67KoUc1SItY59L4+ny+2du3aK29OJp9GA5qVCDJSgHMhVW5rDWQ7Z16k1s4pL4uU9JXkek3hmssTMJeLMr3Z+b1rkRovwuF0wR9ogsPlRrg1jDNXd+ChxycAt026C+jeqqhg5c3+enVVvPp99fO6+oAsBol0D91j5cqV32tvb7/7hmh0dCpevGURpLehVVKV41TdXdMVXshArYgUWD3bLi26NltgEWWgXIIdFUTjOdz/k6cxmCziC39zLTSrHdHEmExbUy0VUSqTe3hy1SRnYVHfm1o7M19V6vrvQaRXsHycR7gEUjgcfnHZsmVf/1Q6/TCi02fWn5MI0jNVb2MbvaSeGq1CNNXEAMlPStRRqVBmxSyyE2U0ex0wlQoQtN6X3kEzIeB1Y7xQxHceegLR1Di+9YVPwe9xIhpPQQgXhpOUBm1SN+jfi1MLcLwmt2L9u+sjGlh8seKn9QHhcPhJt9v9wzuF+D7SacyUZtUD9C250eBmOkfZdMxPp9OTvpVKGZH4GIJeF845fSWee3G3zANEmbPaWoIyfRmlJ6DV8Ku62vDAI7+WSVy/ftcnZbozeo+ByAhsNiscTqe0lpjoOcQ4/q0Co7BCNYcEm7cc90/XBwKBdGdn54/9fv/Pbs3nH6tnj5oFzTlbitGgSD2v3+ZrjPa12ieH8cmWXy5jOD6GJr8bN2/ZhHa/HYnYKDafuQ4+tx3PvLRHJmki8cLPOeOUlXjgkd/g7NPX4iNXXIIjfQPY++YgWkMBw5bPrgOW+zypQiKPWze3dno38vO0trb+0WKxPOV2u19raWl5dOvwcBr5uWfKn/U4wEiWz+ZcowkOc82rSMwvlSaQyuZht5tx0yW9CLmtSGQncP+9n0FzcwvSqTj2HDiKPW/0Y1lbCFU2MWkdlt2GF17ZLwF4/IU96B8dx6kndcqewpYOr2rkZajEcNI3PKag9yBrqbm5Oef1ep92OByveTyew4FA4PmPDQ3tkg8jRW5g18+W5qyEVSuG91VH1HT6QX/eXEvOROKHak6UBW68pBdhvxv9sRTOO/ssyXwil8uLnu4O/HbHK3IcQCmNzRYTShMVxIZHccGZJyOdzeEn219EV0czLDQ5Ttm3auYliZ7aAglp0pK4o55HoITD4f0dHR0/DwaDOzwez++u6eubzJpI4ksRYW8XzQgAfeCpvjXrF7EZxVDqW7xabDZbXfRQXUrafeEZJ6G3pwNHhhPo6V4m/exj2Vw9m/pXPrsV5515Kp76w26M5wsyYR+18s987DJ88OILcPu/PIhMvogVy9tkvmn5ZS0W2bJlistcjnL6SGXf1tYWO+mkk55wOBwP32M2PypleSIxWY4zzbgHGLkkjBLfTWduEhn5U2Kx2KRfXTPJNJNnr+1EdjyPgNeDld1d0ExkGWVkruhqpQq73YqrLnsvrrrsL5DJ5OT4INQUlPe//Rs/xHOvHMAZa1fINGf8ntzyiekDAwPyuRs3bry/u7v7y9f298/cdHkbadZWkBGT9b2CnVIka1XHl37QZaoNgGgSm1aZy0VuFYHWpgD8MsmeQEswCCdZNGSpyGsFzBazTMbUNxiBzWpBW8gPmD147cBh3P/gdrx8oA/rV3XJDFuVWutnmU/PGRwcJAtmZOPGjR/9RCLxa/T340TRnHSAmoyCiEeTah5OGr2SjCXLgZN483Vc12w2yzW1/f39ykpyk5Tfzx+IYsumHqw7qRPBkB8TFU3a+/Qsp80Kl8MOk9UmsyM+v/tNPPfKQfzoV8/BZjHjtNVdsiexBcPhIMR8SqDU2dn5x7PPPnvL1UePjuAE01tSwqqDi33rDAB1dx5McUI7XinOI8dMJiNXldM+9xaCtFqewG92HsCR4Tjec/ooVq1YhmXtYbQGfbITHI6MYng0hWgijef3HMGOVw9KsFd1d8Dv96JKif1qtj1bPvQupGy7u7sfva+p6cM4ehTzgd4Wb6ga76i6cylOhphMGUI4gRL7VNjeJlIzXnEi1oATODwQxatvDMBhs6A54EVzwCNNzWgqK/OEkvKlLOorl7fB5/PLlj7pFv5TZix2CRMAq1ev/uaX7fbPYR7R2wKAkRuZHVYEAnszyeRTfehaTQlz3WMUvWaCz+OQgy6y86nHHBmiPHACHpcdK5a11hO8spONQOWpRX4fYny1Ws2sX7/+xjtKpZ9gntHbOh/QaMBGIHBeZv3PEZoU17Bq0tb96rWRKt9DzXjFCl/9HTFmPo9qQ6HQ493d3TfcEI2ecHk/px9yu+aef3s/gP+bCiy1BzRyVTCzeJjPSrlSY75qTamuXxJbgUCgrj/0S344AJaZz/e1WCyZjo6OO26fmPgeFvpPGd4Zj68F8GMAp+u9hPUbGUQMM5PUnxtURY1mMIpmEKkeWVAU7sFuCn2aMHVSnXN41n4M4uFwOHzLLdnsvGz1c/4tyW2JxNeEEPfoHW76QsTMUgOaiPRzr5oSfaZeSyKHAKi/qC6VpPqDcJwqxu/3H2hra/vbW/P57Visv6a6LZFYJ4T4RyHE5fqeoKYNU0ULn+MWr7p/he75nMiCRE79JXU9hUHlREl+vz+xbNmyO24rFh/Au+X3hO9KJi+tVqv3V6vVHpXRaivVT+Hxeb3CJVKtItW1ofYUPahut7sQDof/qamp6VufSCQW5G/RzxkAprtTqeuFENsqlcrJapCTykCjcYJKQlG+eoXOsp22qVc4HI6qz+d7ORgM/qfL5Xr002NjJ+TXj+YNAExfymZJNF1ULpc/WiwWN1QqFZtqIqoWkVEKMCK1t/BSH2K6y+Xa6ff7n/L5fNtNJtOrny0U5vRrFYsaAJX+vlBoFUJ0ANhcqVQuLRQKm4vFYrMa8Kr3rlar1ZIQImcymXIOh+N1j8fzstfrfclms73wuXL5MBYpHRcAVPq6pq2rVCrnFovFnkKh4C0Wi5ZyuWwWQlQtFkvRbDZXzWZzrlKppG02W0YIkbHb7fuCweCe24rFefs7wO8YAEt0fGnRL9Kb77QEAE4s/T96CprLgveDagAAAABJRU5ErkJggg=="
					width="48"
					height="48"
				/>
			</svg>

			<svg v-else-if="segment.type === 'body'" viewBox="0 0 48 48" class="az-snake__svg">
				<defs>
					<clipPath :id="`snake-body-clip-${i}`">
						<rect x="0" y="6" width="48" height="36" />
					</clipPath>
				</defs>
				<rect class="az-snake__body" x="0" y="6" width="48" height="36" />
				<ellipse class="az-snake__dots" cx="12" cy="6" rx="12" ry="10" :clip-path="`url(#snake-body-clip-${i})`" />
				<ellipse class="az-snake__dots" cx="36" cy="42" rx="12" ry="10" :clip-path="`url(#snake-body-clip-${i})`" />
			</svg>

			<svg v-else-if="segment.type === 'corner'" viewBox="0 0 48 48" class="az-snake__svg">
				<defs>
					<clipPath :id="`snake-corner-clip-${i}`">
						<path d="M0 6 H18 A24 24 0 0 1 42 30 V42 H0 Z" />
						<rect x="6" y="42" width="36" height="6" />
					</clipPath>
				</defs>
				<g :clip-path="`url(#snake-corner-clip-${i})`">
					<rect class="az-snake__body" x="0" y="6" width="42" height="36" />
					<rect class="az-snake__body" x="6" y="42" width="36" height="6" />
					<ellipse class="az-snake__dots" cx="34" cy="14" rx="14" ry="12" transform="rotate(45 34 14)" />
				</g>
			</svg>

			<svg v-else viewBox="0 0 48 48" class="az-snake__svg">
				<defs>
					<clipPath :id="`snake-tail-clip-${i}`">
						<rect x="0" y="6" width="30" height="36" />
					</clipPath>
				</defs>
				<ellipse class="az-snake__body" cx="30" cy="24" rx="18" ry="18" />
				<rect class="az-snake__body" x="0" y="6" width="30" height="36" />
				<ellipse class="az-snake__dots" cx="12" cy="6" rx="12" ry="10" :clip-path="`url(#snake-tail-clip-${i})`" />
			</svg>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Direction, SnakeSegmentType, TilePosition } from '@/types/snake'

const props = defineProps<{
    tile: number
	snake: TilePosition[]
}>()

const getDirection = (from: TilePosition, to: TilePosition): Direction => {
	if (to.x > from.x) return 'right'
	if (to.x < from.x) return 'left'
	if (to.y > from.y) return 'down'
	return 'up'
}

const getRotation = (direction: Direction): number => {
	if (direction === 'right') return 0
	if (direction === 'down') return 90
	if (direction === 'left') return 180
	return 270
}

const getCornerRotation = (a: Direction, b: Direction): number => {
	const key = `${a}-${b}`

	if (key === 'right-down' || key === 'down-right') return -90
	if (key === 'down-left' || key === 'left-down') return 0
	if (key === 'left-up' || key === 'up-left') return 90
	if (key === 'up-right' || key === 'right-up') return 180

	return 0
}

const isStraight = (a: Direction, b: Direction): boolean =>
	(a === 'left' && b === 'right') ||
	(a === 'right' && b === 'left') ||
	(a === 'up' && b === 'down') ||
	(a === 'down' && b === 'up')

const isInside = (x: number, y: number): boolean =>
	x >= 0 && y >= 0

const segments = computed(() => {
	if (!props.snake || props.snake.length === 0) return []

	return props.snake
		.map((current, index) => {
			const prev = props.snake[index - 1]
			const next = props.snake[index + 1]

			let type: SnakeSegmentType = 'body'
			let rotation = 0

			if (index === 0) {
				type = 'head'
				if (next) {
					rotation = getRotation(getDirection(next, current))
				}
			}
			else if (index === props.snake.length - 1 && prev) {
				type = 'tail'
				rotation = getRotation(getDirection(prev, current))
			}
			else if (prev && next) {
				const d1 = getDirection(current, prev)
				const d2 = getDirection(current, next)

				if (isStraight(d1, d2)) {
					rotation = getRotation(d2)
				} else {
					type = 'corner'
					rotation = getCornerRotation(d1, d2)
				}
			}

			return {
				x: current.x,
				y: current.y,
				type,
				rotation
			}
		})
		.filter(segment => isInside(segment.x, segment.y))
		.map(segment => ({
			x: segment.x * props.tile,
			y: segment.y * props.tile,
			type: segment.type,
			rotation: segment.rotation
		}))
})
</script>

<style lang="scss" scoped>
.az-snake {
	position: relative;
	width: 100%;
	height: 100%;

	&__segment {
		position: absolute;
		width: 48px;
		height: 48px;
		transform-origin: center;
	}

	&__svg {
		width: 48px;
		height: 48px;
		display: block;
	}

	&__body {
		fill: $color-navy-200;
	}

	&__dots {
		fill: $color-rose-200;
	}
}
</style>