import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from './constants';
import cx from 'classnames';
import Icon from './Icon';
import idgen from './idgen';

class Button extends Component {
  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
  }

  componentDidMount() {
    const { tooltip, tooltipOptions } = this.props;
    if (
      typeof $ !== 'undefined' &&
      (typeof tooltip !== 'undefined' || typeof tooltipOptions !== 'undefined')
    ) {
      $(this._btnEl).tooltip(tooltipOptions);
    }
  }

  render() {
    const {
      className,
      node,
      fab,
      fabClickOnly,
      modal,
      flat,
      floating,
      large,
      disabled,
      waves,
      tooltip,
      ...other
    } = this.props;

    const toggle = fabClickOnly ? 'click-to-toggle' : '';
    let C = node;
    let classes = {
      btn: true,
      disabled,
      'waves-effect': waves
    };

    if (constants.WAVES.indexOf(waves) > -1) {
      classes['waves-' + waves] = true;
    }

    let styles = { flat, floating, large };
    constants.STYLES.forEach(style => {
      classes['btn-' + style] = styles[style];
    });

    if (modal) {
      classes['modal-action'] = true;
      classes['modal-' + modal] = true;
    }
    if (fab) {
      const button = cx(classes, className);
      const parent = cx(fab, toggle, 'fixed-action-btn');
      return (
        <div
          className={parent}
          disabled={!!disabled}
          data-tooltip={tooltip}
          ref={el => (this._btnEl = el)}
        >
          <a id={other.id} className={button}>{this.renderIcon()}</a>
          <ul>
            {React.Children.map(this.props.children, child => {
              return <li key={idgen()}>{child}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <C
          {...other}
          disabled={!!disabled}
          onClick={this.props.onClick}
          className={cx(classes, className)}
          ref={el => (this._btnEl = el)}
          data-tooltip={tooltip}
        >
          {this.renderIcon()}
          {this.props.children}
        </C>
      );
    }
  }

  renderIcon() {
    const { icon } = this.props;
    if (!icon) return;

    return <Icon>{icon}</Icon>;
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Enable other styles
   */
  flat: PropTypes.bool,
  large: PropTypes.bool,
  floating: PropTypes.bool,
  /**
   * Fixed action button
   * If enabled, any children button will be rendered as actions, remember to provide an icon.
   * @default vertical. This will disable any onClick function from being called on the main button.
   */
  fab: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * The icon to display, if specified it will create a button with the material icon.
   */
  icon: PropTypes.string,
  modal: PropTypes.oneOf(['close', 'confirm']),
  node: PropTypes.node,
  /**
   * Will be disabled when fab is set.
   */
  onClick: PropTypes.func,
  /**
   * Tooltip to show when mouse hovered
   */
  tooltip: PropTypes.string,
  /**
   * Tooltips options as here
   * http://archives.materializecss.com/0.100.2/dialogs.html#tooltip
   */
  tooltipOptions: PropTypes.shape({
    delay: PropTypes.number,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltip: PropTypes.string,
    html: PropTypes.bool
  }),
  waves: PropTypes.oneOf([
    'light',
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'teal'
  ]),
  /**
   * FAB Click-Only
   * Turns a FAB from a hover-toggle to a click-toggle
   */
  fabClickOnly: PropTypes.bool
};

Button.defaultProps = {
  node: 'button'
};

export default Button;
