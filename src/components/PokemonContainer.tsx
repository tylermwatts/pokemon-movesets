import { FunctionComponent, useEffect, useState } from 'react'
const Pokedex = require('pokeapi-js-wrapper')
const P = new Pokedex.Pokedex()

const InfoCard: FunctionComponent<{ move: any }> = ({ move }) => {
	const { name } = move
	const [moveInfo, setMoveInfo] = useState<any>()

	useEffect(() => {
		async function getMoveInfo() {
			const info = await P.getMoveByName(name)
			setMoveInfo(info)
		}
		getMoveInfo()
	}, [name])

	return (
		<div>
			<p>Move Name: {name}</p>
			{moveInfo && <p>Type: {moveInfo.type.name}</p>}
		</div>
	)
}

const PokemonContainer: FunctionComponent<{ pokemon: any }> = ({ pokemon }) => {
	return (
		pokemon && (
			<div>
				<img alt='sprite' src={pokemon.sprites.front_default} />
				{pokemon.moves
					.filter((entry: any) =>
						entry.version_group_details.filter(
							(ver: any) => ver.version_group.name === 'gold-silver'
						)
					)
					.map((entry: any) => {
						return <InfoCard key={entry.move.name} move={entry.move} />
					})}
			</div>
		)
	)
}

export default PokemonContainer
