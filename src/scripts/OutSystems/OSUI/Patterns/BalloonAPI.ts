// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OutSystems.OSUI.Patterns.BalloonAPI {
	const _balloonMap = new Map<string, OSFramework.OSUI.Patterns.Balloon.IBalloon>();

	/**
	 * Function that will change the property of a given Balloon pattern.
	 *
	 * @export
	 * @param {string} balloonId
	 * @param {string} propertyName
	 * @param {*} propertyValue
	 * @return {*}  {string}
	 */
	export function ChangeProperty(balloonId: string, propertyName: string, propertyValue: any): string {
		const result = OutSystems.OSUI.Utils.CreateApiResponse({
			errorCode: ErrorCodes.Balloon.FailChangeProperty,
			callback: () => {
				const balloon = GetBalloonById(balloonId);

				balloon.changeProperty(propertyName, propertyValue);
			},
		});

		return result;
	}

	/**
	 * Create the new Balloon instance and add it to the Balloon Map
	 *
	 * @export
	 * @param {string} balloonId
	 * @param {string} configs
	 * @return {*}  {OSFramework.OSUI.Patterns.Balloon.IBalloon}
	 */
	export function Create(balloonId: string, configs: string): OSFramework.OSUI.Patterns.Balloon.IBalloon {
		if (_balloonMap.has(balloonId)) {
			throw new Error(
				`There is already a ${OSFramework.OSUI.GlobalEnum.PatternName.Balloon} registered under id: ${balloonId}`
			);
		}

		const _balloonItem = new OSFramework.OSUI.Patterns.Balloon.Balloon(balloonId, JSON.parse(configs));

		_balloonMap.set(balloonId, _balloonItem);
		_balloonItem.build();

		return _balloonItem;
	}

	/**
	 * Function that will dispose the instance of the given Balloon
	 *
	 * @export
	 * @param {string} balloonId
	 */
	export function Dispose(balloonId: string): string {
		const result = OutSystems.OSUI.Utils.CreateApiResponse({
			errorCode: ErrorCodes.Balloon.FailDispose,
			callback: () => {
				const balloon = GetBalloonById(balloonId);

				balloon.dispose();

				_balloonMap.delete(balloon.uniqueId);
			},
		});

		return result;
	}

	/**
	 * Function that will return the Map with all the Balloon instances at the page
	 *
	 * @export
	 * @return {*}  {Array<string>}
	 */
	export function GetAllBalloons(): Array<string> {
		return OSFramework.OSUI.Helper.MapOperation.ExportKeys(_balloonMap);
	}

	/**
	 * Function that gets the instance of Balloon by a given Id.
	 *
	 * @export
	 * @param {string} balloonId
	 * @return {*}  {OSFramework.OSUI.Patterns.Balloon.IBalloon}
	 */
	export function GetBalloonById(balloonId: string): OSFramework.OSUI.Patterns.Balloon.IBalloon {
		return OSFramework.OSUI.Helper.MapOperation.FindInMap(
			'Balloon',
			balloonId,
			_balloonMap
		) as OSFramework.OSUI.Patterns.Balloon.IBalloon;
	}
}
