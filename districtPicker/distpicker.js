;(function($, undefined) {

    var Distpicker = function(ele, opt) {
        this.$element = ele;
        this.default  = {
            'province': 'province',
            'city': 'city',
            'dist': 'dist'
        };
        this.options  = $.extend({}, this.default, opt);
        this._template = {
            province: '<select id="'+ this.options.province +'"></select>',
            city: '<select id="'+ this.options.city +'"></select>',
            dist: '<select id="'+ this.options.dist +'"></select>'
        };
    }
// 31, 376, 3135
    Distpicker.prototype = {
        create: function() {
            this._initProvince(this.options.p)

            return this.$element;
        }
        ,_initProvince: function(p) {
            var _this = this
            var province = $(this._template.province);

            $.each(this.options.data, function(k, v) {
                if (v.pid == 1) {
                    province.append('<option value="'+ v.id +'">'+ v.name + '</option>');
                }
            });
            this.$element.append(province);

            province.on('change', function() {
                _this._initCity(province.val())
            });

            if (typeof p == 'undefined') {
                var pro_val = province.val();
                this._initCity(pro_val);
            } else {
                province.val(p);
                var c = _this.options.c
                this._initCity(p, c)
            }

        }
        , _initCity: function(province, c) {
            var _this = this;
            var city = $(this._template.city);

            _this.$element.find('#' + _this.options.city).remove();

            $.each(this.options.data, function(k, v) {
                if (v.pid == province) {
                    city.append('<option value="'+ v.id +'">'+ v.name + '</option>');
                }
            });

            this.$element.append(city);

            city.on('change', function() {
                _this._initDist(city.val())
            });

            if (typeof c == 'undefined') {
                var city_val = city.val();
                this._initDist(city_val);
            } else {
                city.val(c);
                var d = _this.options.d;
                this._initDist(c, d);
            }

        }, _initDist: function(city, d) {
            var _this = this;

            var dist = $(this._template.dist);

            _this.$element.find('#' + _this.options.dist).remove();

            $.each(this.options.data, function(k, v) {
                if (v.pid == city) {
                    dist.append('<option value="'+ v.id +'">'+ v.name + '</option>');
                }
            });

            if (dist.find('option').length == 0) {
                return ;
            }

            if (typeof d != 'undefined') {
                dist.val(d);
            }

            this.$element.append(dist);
        }

    }

    $.fn.distpicker = function(opts) {

        var distpicker = new Distpicker(this, opts);

        return distpicker.create();
    }
})(jQuery);