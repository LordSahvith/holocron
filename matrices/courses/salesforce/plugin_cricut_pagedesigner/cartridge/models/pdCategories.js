'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var categoryLinkTypeOther = require('dw/catalog/CategoryLink').LINKTYPE_OTHER;
var URLUtils = require('dw/web/URLUtils');

/**
 * Determine if category should be included in Home Navigation
 * @param {dw.catalog.Category} category - Current category
 * @returns {boolean} - to include category or not
 */
function showInLocalizedHomeMenu(category) {
    // SFCC doesn't allow localizable booleans, so cricutAvailableForLocale is an enum of strings (true/false)
    // cricutAvailableForLocale will not be included in .custom unless a value is set in BM
    if ('cricutAvailableForLocale' in category.custom && category.custom.cricutAvailableForLocale == 'false') {
        return false;
    }

    if ('cricutShowInHomeMenu' in category.custom && category.custom.cricutShowInHomeMenu === true) {
        return true;
    }
    return false;
}

/**
 * Get category url
 * @param {dw.catalog.Category} category - Current category
 * @returns {string} - Url of the category
 */
function getCategoryUrl(category) {
    return category.custom && 'alternativeUrl' in category.custom && category.custom.alternativeUrl
        ? (category.custom.alternativeUrl.toString()).replace(/&amp;/g, '&')
        : URLUtils.url('Search-Show', 'cgid', category.getID()).toString();
}

/**
 * Gets a Category Link (type = other) URL for the given category's promotion
 * banner appearing in the top nav menu.
 * @param {dw.catalog.Category} category - Current category
 * @returns {string} - Url of the category link
 */
function getCategoryPromotionLinkUrl(category) {
    if (category.custom && !category.custom.promoImage && !category.custom.promoText) {
        return '';
    }

    var otherCategoryLinks = category.getOutgoingCategoryLinks(categoryLinkTypeOther);

    if (otherCategoryLinks.isEmpty()) {
        return '';
    }

    return getCategoryUrl(otherCategoryLinks[0].getTargetCategory());
}

/**
 * Gets an array of featured categories for given category
 * @param {dw.catalog.Category} category - Current category
 * @returns {dw.util.ArrayList<dw.catalog.Category>} - featured categories
 */
function getFeaturedCategories(category) {
    var featuredCategories = [];
    if(category.custom.isFeaturedCategory)
    {
        var featuredcategorylinks = category.getOutgoingCategoryLinks();
        collections.forEach(featuredcategorylinks, function (featuredcategorylink) {
            var converted = null;
            var targetCategory = featuredcategorylink.targetCategory;
            if (targetCategory.hasOnlineProducts()) {
                converted = categoryToObject(targetCategory);
            }
            if (converted) {
                featuredCategories.push(converted);
            }
        });

    }
    return featuredCategories;
}

/**
 * Converts a given category from dw.catalog.Category to plain object
 * @param {dw.catalog.Category} category - A single category
 * @returns {Object} plain object that represents a category
 */
function categoryToObject(category) {
    if (!category.custom || !category.custom.showInMenu) {
        return null;
    }
    this.featuredCategories = [];
    var result = {
        name: category.getDisplayName(),
        url: getCategoryUrl(category),
        id: category.ID,
        custom: category.custom,
        promoUrl: getCategoryPromotionLinkUrl(category),
        featuredCategories: getFeaturedCategories(category)
    };
    var subCategories = category.hasOnlineSubCategories() ?
        category.getOnlineSubCategories() : null;

    if (subCategories) {
        collections.forEach(subCategories, function (subcategory) {
            var converted = null;
            if (subcategory.hasOnlineProducts() || subcategory.hasOnlineSubCategories()) {
                converted = categoryToObject(subcategory);
            }
            if (converted) {
                if (!result.subCategories) {
                    result.subCategories = [];
                }
                result.subCategories.push(converted);
            }
        });
        if (result.subCategories) {
            result.complexSubCategories = result.subCategories.some(function (item) {
                return !!item.subCategories;
            });
        }
    }

    return result;
}

/**
 * Converts a given category from dw.catalog.Category to plain object
 * @param {dw.catalog.Category} category - A single category
 * @returns {Object} plain object that represents a category
 */
function categoryToHomeCategoryObject(category) {
    this.featuredCategories = [];
    var result = {
        name: category.getDisplayName(),
        url: getCategoryUrl(category),
        id: category.ID,
        custom: category.custom,
        promoUrl: getCategoryPromotionLinkUrl(category),
        featuredCategories: getFeaturedCategories(category)
    };
    var subCategories = category.hasOnlineSubCategories() ?
        category.getOnlineSubCategories() : null;

    if (subCategories) {
        collections.forEach(subCategories, function (subcategory) {
            if (showInLocalizedHomeMenu(subcategory)) {

                var converted = null;
                converted = categoryToHomeCategoryObject(subcategory);

                if (converted) {
                    if (!result.subCategories) {
                        result.subCategories = [];
                    }
                    result.subCategories.push(converted);
                }
            }
        });
        if (result.subCategories) {
            result.complexSubCategories = result.subCategories.some(function (item) {
                return !!item.subCategories;
            });
        }
    }

    return result;
}

/**
 * Represents a single category with all of it's children
 * @param {dw.util.ArrayList<dw.catalog.Category>} items - Top level categories
 * @constructor
 */
function categories(items) {
    this.categories = [];
    collections.forEach(items, function (item) {
        if (item.custom && item.custom.showInMenu &&
                (item.hasOnlineProducts() || item.hasOnlineSubCategories())) {
            this.categories.push(categoryToObject(item));
        }

        if (showInLocalizedHomeMenu(item)) {
            this.categories.push(categoryToHomeCategoryObject(item));
        }
    }, this);
}

module.exports = categories;
