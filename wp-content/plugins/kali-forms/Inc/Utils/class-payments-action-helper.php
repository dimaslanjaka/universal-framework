<?php
namespace KaliForms\Inc\Utils;

use KaliForms\Inc\Utils\MetaHelper;

class Payments_Action_Helper
{
    /**
     * Metahelper trait
     */
    use MetaHelper;

    /**
     * Parent plugin slug
     *
     * @var string
     */
    public $slug = 'kaliforms';
    /**
     * Current post
     *
     * @var [type]
     */
    public $post = null;
    /**
     * Class constructor
     *
     * @param [type] $formId
     */
    public function __construct($formId)
    {
        $this->form = $formId;

        if ($this->form === null) {
            return new \WP_Error();
        }

        if (empty($_POST['data'])) {
            return new \WP_Error(500, esc_html__('There is no post data', 'kaliforms'));
        }

        if (empty($_POST['data']['formId'])) {
            return new \WP_Error(500, esc_html__('Form didn`t send a form id, are we sure it is correct?', 'kaliforms'));
        }

    }

    /**
     * Verify products from the database
     * @todo should be moved in the payment plugin - actions part
     * @return void
     */
    public function get_products()
    {
        $this->post = get_post($_POST['data']['formId']);

        if ($this->post === null) {
            return new \WP_Error(500, esc_html__('There is no form associated with this id. Make sure you copied it correctly', 'kaliforms'));
        }

        $fields = json_decode($this->get('field_components', '[]'), false, 512, JSON_HEX_QUOT);
        $products = [];
        $payee = false;
        foreach ($fields as $k => $v) {
            if ($v->id === 'paypal') {
                $payee = $v->properties->merchantEmail;
            }
            if ($v->id === 'product') {
                $products[] = [
                    'type' => $v->id,
                    'id' => $v->properties->id,
                    'price' => $v->properties->price,
                    'caption' => $v->properties->caption,
                    'description' => $v->properties->description,
                ];
            }
            if ($v->id === 'multipleProducts') {
                foreach ($v->properties->products as $deepK => $deepV) {
                    $products[] = [
                        'type' => $v->id,
                        'id' => $v->properties->id,
                        'price' => $deepV->price,
                        'caption' => $v->properties->caption,
                        'variant' => $deepV->label,
                        'description' => $v->properties->description,
                    ];
                }
            }
        }

        if ($payee) {
            foreach ($products as $i => $product) {
                $products[$i]['payee'] = $payee;
            }
        }

        return wp_json_encode(
            [
                'response' => $products,
            ]
        );
    }
}
