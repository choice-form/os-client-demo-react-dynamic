import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import NodeBody from '../../../partials/components/basic/node-body';

interface IProps extends IQuesComBaseProps {
  node: CFRegionQuestion;
}

class RegionAdvanced extends React.Component<IProps> {
  /**
   * 选择城市后的处理方法
   * @param value 选中序号
   */
  handleCityChange(value: string): void {
    const { node, handler } = this.props;
    const provIndex = node.indexes.split(' ').map(t => Number(t))[0];
    handler.handleManualLocate(`${provIndex} ${value} 0`, node);
  }

  /**
   * 选择区县后的处理方法
   * @param value 选中序号
   */
  handleCountyChange(value: string): void {
    const { node, handler } = this.props;
    const indexes = node.indexes.split(' ').map(t => Number(t))
    const provIndex = indexes[0];
    const cityIndex = indexes[1];
    handler.handleManualLocate(`${provIndex} ${cityIndex} ${value}`, node);
  }
  /**
   * 选择省份后的处理方法
   * @param value 选中序号
   */
  handleProvinceChange(value: string): void {
    const { node, handler } = this.props;
    handler.handleManualLocate(`${value} 0 0`, node);
  }

  /**
   * 渲染
   */
  render(): JSX.Element {
    const { node, theme } = this.props;
    const indexes = node.indexes.split(' ').map(t => Number(t));
    // 省份选择数据,一直会准备
    const provinces = node.regions;
    const selectedProvinceIndex = indexes[0];
    const selectedProvince = provinces[selectedProvinceIndex];
    // 城市选择数据
    let cities: CFRegionCity[];
    let selectedCityIndex = 0;
    let selectedCity: CFRegionCity;
    // 县区选择数据
    let counties: CFRegionCounty[];
    let selectedCountyIndex = 0;
    // 当收集范围涉及到城市才准备城市数据
    if (node.grade > 1 && selectedProvince) {
      cities = selectedProvince.cities;
      selectedCityIndex = indexes[1];
      selectedCity = cities[selectedCityIndex];
      // 当收集范围设计到区县,才准备区县数据
      if (node.grade > 2 && selectedCity) {
        counties = selectedCity.counties;
        selectedCountyIndex = indexes[2];
      }
    }
    return <div className='basic-region'>
      {/* 调用共通组件渲染头部 */}
      <NodeHead node={node} theme={theme} />
      {/* 渲染省市区选择UI */}
      <NodeBody theme={theme}>
        {/* 省份选择 */}
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
        {/* 城市选择 */}
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
        {/* 区县选择 */}
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
      </NodeBody>
      {/* 地域题题的选项和其他选项时不需要渲染的 */}
    </div>
  }
}

export default RegionAdvanced;