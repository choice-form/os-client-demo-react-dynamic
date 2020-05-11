import React from 'react';

interface IProps extends IQuesComBaseProps {
  node: CFRegionQuestion;
}

class RegionAdvanced extends React.Component<IProps> {
  handleCityChange(value: string): void {
    const { node, handler } = this.props;
    const provIndex = node.indexes.split(' ').map(t => Number(t))[0];
    handler.handleManualLocate(`${provIndex} ${value} 0`, node);
  }
  handleCountyChange(value: string): void {
    const { node, handler } = this.props;
    const indexes = node.indexes.split(' ').map(t => Number(t))
    const provIndex = indexes[0];
    const cityIndex = indexes[1];
    handler.handleManualLocate(`${provIndex} ${cityIndex} ${value}`, node);
  }
  handleProvinceChange(value: string): void {
    const { node, handler } = this.props;
    handler.handleManualLocate(`${value} 0 0`, node);
  }
  render(): JSX.Element {
    const { node } = this.props;
    const indexes = node.indexes.split(' ').map(t => Number(t));
    const provinces = node.regions;
    const selectedProvinceIndex = indexes[0];
    const selectedProvince = provinces[selectedProvinceIndex];

    let cities: RegionCity[];
    let selectedCityIndex = 0;
    let selectedCity: RegionCity;

    let counties: RegionCounty[];
    let selectedCountyIndex = 0;
    if (node.grade > 1 && selectedProvince) {
      cities = selectedProvince.cities;
      selectedCityIndex = indexes[1];
      selectedCity = cities[selectedCityIndex];
      if (node.grade > 2 && selectedCity) {
        counties = selectedCity.counties;
        selectedCountyIndex = indexes[2];
      }
    }
    return <div className='basic-region'>
      <select value={selectedProvinceIndex}
        onChange={(e) => this.handleProvinceChange(e.target.value)}>
        <option value={node.placeholder} hidden={true}>
          {node.placeholder}
        </option>
        {provinces.map((prov, index) => {
          return <option value={index} key={index}>
            {prov.Meaning}
          </option>
        })}
      </select>
      {cities
        ? <select value={selectedCityIndex}
          onChange={(e) => this.handleCityChange(e.target.value)}>
          <option value={node.placeholder} hidden={true}>
            {node.placeholder}
          </option>
          {cities.map((city, index) => {
            return <option value={index} key={index}>
              {city.Meaning}
            </option>
          })}
        </select>
        : null}

      {counties
        ? <select value={selectedCountyIndex}
          onChange={(e) => this.handleCountyChange(e.target.value)}>
          <option value={node.placeholder} hidden={true}>
            {node.placeholder}
          </option>
          {counties.map((county, index) => {
            return <option value={index} key={index}>
              {county.Meaning}
            </option>
          })}
        </select>
        : null}
    </div>
  }
}

export default RegionAdvanced;